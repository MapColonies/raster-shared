import { z } from 'zod';
import { SourceType } from '../../constants/core/constants';

export const fsStorageSchema = z.object({
  storageProvider: z.literal(SourceType.FS),
  subPath: z.string().min(1),
});

export const s3StorageSchema = z.object({
  storageProvider: z.literal(SourceType.S3),
  bucket: z.string().min(1),
});

export const storageSchema = z.discriminatedUnion('storageProvider', [fsStorageSchema, s3StorageSchema]);
