import z from 'zod';
import { checksumSchema, fileMetadataSchema } from '../../schemas/core';

export type FileMetadata = z.infer<typeof fileMetadataSchema>;
export type Checksum = z.infer<typeof checksumSchema>;
