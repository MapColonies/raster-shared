import z from 'zod';
import { urlSchema } from './link.schema';

export const fileMetadataSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().nonnegative().int().describe('File size in bytes'),
  url: urlSchema,
});
