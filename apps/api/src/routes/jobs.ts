import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createJobSchema } from "../lib/validate";

const r = Router();
const prisma = new PrismaClient();

r.get("/", async (req, res) => {
  const { page = 1 } = req.query as any;
  const take = 20; const skip = (Number(page) - 1) * take;
  const jobs = await prisma.job.findMany({ take, skip, include: { company: true, applications: true } });
  res.json(jobs);
});

r.post("/", async (req, res) => {
  const parsed = createJobSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });
  const job = await prisma.job.create({ data: parsed.data });
  res.status(201).json(job);
});

r.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const parsed = createJobSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });
  const job = await prisma.job.update({ where: { id }, data: parsed.data });
  res.json(job);
});

r.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.application.deleteMany({ where: { jobId: id } });
  await prisma.job.delete({ where: { id } });
  res.status(204).send();
});

export default r;