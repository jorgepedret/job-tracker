import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createApplicationSchema } from "../lib/validate";

const r = Router();
const prisma = new PrismaClient();

r.get("/", async (req, res) => {
  const { jobId } = req.query as any;
  const where = jobId ? { jobId: Number(jobId) } : {};
  const apps = await prisma.application.findMany({ where });
  res.json(apps);
});

r.post("/", async (req, res) => {
  const parsed = createApplicationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const app = await prisma.application.create({ data: parsed.data });
    res.status(201).json(app);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});

export default r;