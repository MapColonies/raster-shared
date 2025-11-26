import { z } from 'zod';
import { fileMetadataSchema } from '../../schemas';

export type FileMetadata = z.infer<typeof fileMetadataSchema>;
