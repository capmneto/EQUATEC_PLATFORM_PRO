import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "E-mail",
          type: "email",
        },

        password: {
          label: "Senha",
          type: "password",
        },
      },

      async authorize(credentials) {
      const inputEmail = String(credentials?.email || "").trim().toLowerCase();
      const inputPassword = String(credentials?.password || "");
      const localAdminEmail = process.env.LOCAL_DEV_ADMIN_EMAIL?.trim().toLowerCase();
      const localAdminPassword = process.env.LOCAL_DEV_ADMIN_PASSWORD;

      if (
        process.env.NODE_ENV !== "production" &&
        localAdminEmail &&
        localAdminPassword &&
        inputEmail === localAdminEmail &&
        inputPassword === localAdminPassword
      ) {
        return {
          id: "local-dev-super-admin",
          name: "Carlos Machado",
          email: localAdminEmail,
          role: "SUPER_ADMIN",
          status: "APPROVED",
        } as any;
      }
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const passwordHash =
          (user as any).passwordHash ||
          (user as any).hashedPassword ||
          (user as any).password;

        if (!passwordHash) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          credentials.password,
          passwordHash,
        );

        if (!validPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: (user as any).role || "USER",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export async function auth() {
  return getServerSession(authOptions);
}
