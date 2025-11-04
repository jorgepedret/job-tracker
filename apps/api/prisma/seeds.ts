import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Reset tables (order matters)
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});
  await prisma.company.deleteMany({});

  // Companies
  await prisma.company.createMany({
    data: [
      { name: "Plexxis" },
      { name: "NextCo" },
      { name: "Acme" },
      { name: "BuildRight" }
    ]
  });

  // Ensure at least one company for jobs
  const plxx = (await prisma.company.findFirst({ where: { name: "Plexxis" } }))
    ?? (await prisma.company.findFirst())!;

  // Jobs
  const job = await prisma.job.create({
    data: { title: "Jr. Developer", companyId: plxx.id }
  });

  // Applications
  const statuses = ["applied", "phone", "onsite", "offer", "rejected"] as const;
  for (let i = 0; i < 12; i++) {
    await prisma.application.create({
      data: {
        jobId: job.id,
        status: statuses[i % statuses.length],
        notes: i % 3 === 0 ? "Auto-seeded note" : undefined,
        appliedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      }
    });
  }

  // Another job
  const anyCompany = await prisma.company.findFirst();
  if (anyCompany) {
    await prisma.job.create({
      data: { title: "Frontend Developer", companyId: anyCompany.id }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });