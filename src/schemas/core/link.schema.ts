import z from 'zod';

export const urlSchema = z.string().url();

export const urlsArraySchema = z.array(urlSchema);

export const fileMetadataSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().nonnegative(),
  url: urlSchema,
});
