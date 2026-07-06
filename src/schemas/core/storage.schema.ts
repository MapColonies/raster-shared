import { z } from 'zod';
import { SourceType } from '../../constants/core/constants';

export const fsStorageSchema = z.object({
  sourceProvider: z.literal(SourceType.FS),
});

export const s3StorageSchema = z.object({
  sourceProvider: z.literal(SourceType.S3),
  bucket: z.string().min(1),
});

export const storageSchema = z.discriminatedUnion('sourceProvider', [fsStorageSchema, s3StorageSchema]);
