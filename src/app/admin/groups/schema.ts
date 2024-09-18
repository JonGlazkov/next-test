import { z } from "zod";

export const upsertGroupSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type UpsertGroupSchema = z.infer<typeof upsertGroupSchema>;

export const deleteGroupSchema = z.object({
  id: z.string(),
});

export type DeleteGroupSchema = z.infer<typeof deleteGroupSchema>;
