// apps/api/prisma/seeds.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Reset (order matters)
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});
  await prisma.company.deleteMany({});

  // Companies
  const [techPlus, greenRoots, brightWays] = await Promise.all([
    prisma.company.create({ data: { name: "TechnicalitiesPlus" } }),
    prisma.company.create({ data: { name: "GreenRoots Collective" } }),
    prisma.company.create({ data: { name: "BrightWays Foundation" } }),
  ]);

  // Jobs
  const wpDev = await prisma.job.create({
    data: { title: "Full Stack Web Developer", companyId: techPlus.id },
  });
  const commMgr = await prisma.job.create({
    data: { title: "Community & Events Manager", companyId: brightWays.id },
  });
  const emailMgr = await prisma.job.create({
    data: { title: "Email Marketing Manager", companyId: greenRoots.id },
  });

  // Applications
  await prisma.application.createMany({
    data: [
      { jobId: wpDev.id, status: "applied", notes: "Tailored resume v2" },
      { jobId: wpDev.id, status: "phone", notes: "Recruiter screen scheduled" },
      { jobId: commMgr.id, status: "applied" },
      { jobId: emailMgr.id, status: "rejected", notes: "Mismatch on schedule" },
    ],
  });
}

main().then(() => prisma.$disconnect()).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});