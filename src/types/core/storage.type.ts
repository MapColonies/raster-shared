import type { z } from 'zod';
import type { fsStorageSchema, s3StorageSchema, storageSchema } from '../../schemas';

export type FsStorage = z.infer<typeof fsStorageSchema>;
export type S3Storage = z.infer<typeof s3StorageSchema>;
export type Storage = z.infer<typeof storageSchema>;
