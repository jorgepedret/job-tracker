import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(2),
  companyId: z.number().int().positive(),
});

export const updateJobSchema = z.object({
  title: z.string().min(2).optional(),
  companyId: z.number().int().positive().optional(),
});

export const createApplicationSchema = z.object({
  jobId: z.number().int().positive(),
  status: z.enum(["applied","phone","onsite","offer","rejected"]).default("applied"),
  notes: z.string().optional(),
});