import z from 'zod';
import { HASH_ALGORITHMS } from '../../constants/core';
import { urlSchema } from './link.schema';

export const fileMetadataSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().nonnegative().int().describe('File size in bytes'),
  url: urlSchema,
});

export const checksumSchema = z.object({
  algorithm: z.enum(HASH_ALGORITHMS),
  checksum: z.string(),
  fileName: z.string(),
});
