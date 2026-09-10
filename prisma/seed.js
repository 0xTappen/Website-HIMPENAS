require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin2@example.com" },
    update: { password, name: "Administrator" },
    create: {
      email: "admin2@example.com",
      password,
      name: "Administrator",
    },
  });

  console.log("Admin seed selesai: admin2@example.com");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
