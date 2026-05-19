import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("TrocarSenha@2026", 12);

  const user = await prisma.user.upsert({
    where: { email: "capmneto@gmail.com" },
    update: {
      name: "Carlos Machado",
      role: "SUPER_ADMIN",
      approved: true,
      password: passwordHash,
    },
    create: {
      name: "Carlos Machado",
      email: "capmneto@gmail.com",
      password: passwordHash,
      role: "SUPER_ADMIN",
      approved: true,
    },
  });

  console.log("SUPER_ADMIN criado/atualizado:", user.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });