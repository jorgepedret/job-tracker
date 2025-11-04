import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const r = Router();
const prisma = new PrismaClient();

r.get("/", async (_req, res) => {
  const companies = await prisma.company.findMany({ orderBy: { name: "asc" } });
  res.json(companies);
});

export default r;