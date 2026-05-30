import { cookies } from "next/headers";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

function normalize(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

function firstValue(row: unknown) {
  if (!row || typeof row !== "object") return null;

  return Object.values(row as Record<string, unknown>)[0];
}

function isApprovedStatus(value: unknown) {
  const status = normalize(value).toUpperCase();

  return [
    "APPROVED",
    "APROVADO",
    "ACTIVE",
    "ATIVO",
    "AUTHORIZED",
    "AUTORIZADO",
    "LIBERADO",
  ].includes(status);
}

function isAdminRole(value: unknown) {
  const role = normalize(value).toUpperCase();

  return ["SUPER_ADMIN", "ADMIN", "OWNER", "GESTOR"].includes(role);
}

function pickField(row: Record<string, unknown>, candidates: string[]) {
  const keys = Object.keys(row);

  for (const candidate of candidates) {
    const exact = keys.find((key) => normalize(key) === normalize(candidate));
    if (exact) return exact;
  }

  for (const candidate of candidates) {
    const partial = keys.find((key) =>
      normalize(key).includes(normalize(candidate)),
    );

    if (partial) return partial;
  }

  return null;
}

async function findDatabaseUser(email: string, password: string) {
  try {
    const tablesRaw = await prisma.$queryRawUnsafe("SHOW TABLES");
    const tables = (tablesRaw as unknown[])
      .map(firstValue)
      .filter(Boolean)
      .map(String);

    for (const tableName of tables) {
      const columnsRaw = await prisma.$queryRawUnsafe(
        `SHOW COLUMNS FROM \`${tableName}\``,
      );

      const columns = (columnsRaw as Array<{ Field: string }>).map(
        (column) => column.Field,
      );

      const emailColumn = columns.find((column) =>
        ["email", "emailaddress", "mail"].includes(normalize(column)),
      );

      const passwordColumn = columns.find((column) =>
        ["password", "passwordhash", "hashedpassword", "senha", "senhahash"].some(
          (name) => normalize(column).includes(name),
        ),
      );

      if (!emailColumn || !passwordColumn) continue;

      const rows = await prisma.$queryRawUnsafe(
        `SELECT * FROM \`${tableName}\` WHERE \`${emailColumn}\` = ? LIMIT 1`,
        email,
      );

      const user = (rows as Record<string, unknown>[])[0];

      if (!user) continue;

      const storedPassword = String(user[passwordColumn] || "");
      const passwordOk = await bcrypt.compare(password, storedPassword);

      if (!passwordOk) continue;

      const idField = pickField(user, ["id"]);
      const nameField = pickField(user, ["name", "nome", "fullName", "displayName"]);
      const roleField = pickField(user, ["role", "perfil", "userRole"]);
      const statusField = pickField(user, ["status", "approvalStatus", "situacao"]);
      const approvedField = pickField(user, ["approved", "isApproved", "aprovado"]);
      const activeField = pickField(user, ["active", "isActive", "ativo", "enabled"]);
      const blockedField = pickField(user, ["blocked", "isBlocked", "bloqueado", "disabled"]);

      const role = String(roleField ? user[roleField] || "USER" : "USER");
      const status = String(statusField ? user[statusField] || "APPROVED" : "APPROVED");

      const approvedValue = approvedField ? user[approvedField] : true;
      const activeValue = activeField ? user[activeField] : true;
      const blockedValue = blockedField ? user[blockedField] : false;

      const approvedOk =
        approvedValue === true ||
        approvedValue === 1 ||
        approvedValue === "1" ||
        normalize(approvedValue) === "true" ||
        isApprovedStatus(status);

      const activeOk =
        activeValue === true ||
        activeValue === 1 ||
        activeValue === "1" ||
        normalize(activeValue) === "true";

      const blocked =
        blockedValue === true ||
        blockedValue === 1 ||
        blockedValue === "1" ||
        normalize(blockedValue) === "true";

      if (!approvedOk || !activeOk || blocked) {
        return null;
      }

      return {
        id: String(idField ? user[idField] : email),
        name: String(nameField ? user[nameField] || email : email),
        email,
        role: isAdminRole(role) ? role : "USER",
        status: isApprovedStatus(status) ? status : "APPROVED",
      } satisfies AuthUser;
    }
  } catch (error) {
    console.error("Erro ao consultar usuário no banco:", error);
  }

  return null;
}

function getLocalDevUser(email: string, password: string) {
  const localEmail = process.env.LOCAL_DEV_ADMIN_EMAIL?.trim().toLowerCase();
  const localPassword = process.env.LOCAL_DEV_ADMIN_PASSWORD;

  if (
    process.env.NODE_ENV !== "production" &&
    localEmail &&
    localPassword &&
    normalize(email) === localEmail &&
    password === localPassword
  ) {
    return {
      id: "local-dev-super-admin",
      name: "Carlos Machado",
      email: localEmail,
      role: "SUPER_ADMIN",
      status: "APPROVED",
    } satisfies AuthUser;
  }

  return null;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "EQUATEC Login",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "").trim().toLowerCase();
        const password = String(credentials?.password || "");

        if (!email || !password) return null;

        const localDevUser = getLocalDevUser(email, password);

        if (localDevUser) return localDevUser as any;

        const databaseUser = await findDatabaseUser(email, password);

        if (databaseUser) return databaseUser as any;

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;

        token.id = authUser.id;
        token.role = authUser.role;
        token.status = authUser.status;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: String(token.id || ""),
        role: String(token.role || "USER"),
        status: String(token.status || "APPROVED"),
      } as any;

      return session;
    },
  },
};

export async function auth() {
  const session = await getServerSession(authOptions);

  if (session?.user) return session as any;

  if (process.env.NODE_ENV !== "production") {
    const cookieStore = await cookies();
    const localDevSession = cookieStore.get("equatec-local-dev-session")?.value;

    if (localDevSession === "1") {
      return {
        user: {
          id: "local-dev-super-admin",
          name: "Carlos Machado",
          email: process.env.LOCAL_DEV_ADMIN_EMAIL || "capmneto@gmail.com",
          role: "SUPER_ADMIN",
          status: "APPROVED",
        },
      } as any;
    }
  }

  return null;
}
