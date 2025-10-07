import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
  await prisma.book.createMany({
    data: [
      title: "Clean Code", author: "Robert C. Martin", year: 2008, isbn: "9780132350884" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999, isbn: "9780201616224" }
    ],
    skipDuplicates: true
  });
}


main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed done ✅");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });