import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createJobSchema, updateJobSchema } from "../lib/validate";

const r = Router();
const prisma = new PrismaClient();

r.get("/", async (req, res) => {
  const { page = 1 } = req.query as any;
  const take = 20; const skip = (Number(page) - 1) * take;
  const jobs = await prisma.job.findMany({
    take, skip,
    orderBy: { createdAt: "desc" },
    include: { company: true, applications: true }
  });
  res.json(jobs);
});

r.post("/", async (req, res) => {
  const parsed = createJobSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { title, companyId } = parsed.data;
  try {
    const job = await prisma.job.create({
      data: { title, companyId },
      include: { company: true, applications: true }
    });
    res.status(201).json(job);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});

r.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  const parsed = updateJobSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  try {
    const job = await prisma.job.update({
      where: { id },
      data: parsed.data,
      include: { company: true, applications: true }
    });
    res.json(job);
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});

r.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    await prisma.application.deleteMany({ where: { jobId: id } });
    await prisma.job.delete({ where: { id } });
    res.status(204).end();
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});

export default r;