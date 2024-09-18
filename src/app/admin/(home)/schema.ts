import { z } from "zod";

export const upsertContactSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  groupId: z.string().optional(),
});

export type UpsertContactSchema = z.infer<typeof upsertContactSchema>;

export const deleteContactSchema = z.object({
  id: z.string(),
});

export type DeleteContactSchema = z.infer<typeof deleteContactSchema>;

export const uploadContactSchema = z.object({
  groupId: z.string(),
  file: z.custom<FileList>(),
});

export type UploadContactSchema = z.infer<typeof uploadContactSchema>;
