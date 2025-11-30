import { z } from 'zod';
import { fileMetadataSchema, urlsArraySchema, urlSchema } from '../../schemas';

export type FileMetadata = z.infer<typeof fileMetadataSchema>;

export type CallbackUrl = z.infer<typeof urlSchema>;
export type CallbackUrlsTargetArray = z.infer<typeof urlsArraySchema>;
