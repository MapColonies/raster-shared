import { z } from 'zod';
import { StorageProvider } from '../../constants/core/constants';

export const s3BucketSchema = z.object({
  bucket: z.string().min(1),
});

export const redisPrefixSchema = z.object({
  prefix: z.string().min(1), // Full Redis key prefix, e.g. `myLayer-redis_WorldCRS84`
});

export const fsSubPathSchema = z.object({
  subPath: z.string().min(1),
});

export const fsStorageSchema = z
  .object({
    storageProvider: z.literal(StorageProvider.FS),
  })
  .merge(fsSubPathSchema);

export const s3StorageSchema = z
  .object({
    storageProvider: z.literal(StorageProvider.S3),
  })
  .merge(s3BucketSchema);

export const redisStorageSchema = z
  .object({
    storageProvider: z.literal(StorageProvider.REDIS),
  })
  .merge(redisPrefixSchema);

export const storageSchema = z.discriminatedUnion('storageProvider', [fsStorageSchema, s3StorageSchema, redisStorageSchema]);
