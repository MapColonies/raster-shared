import { z } from 'zod';
import { urlsArraySchema, urlSchema } from '../../schemas';

export type CallbackUrl = z.infer<typeof urlSchema>;
export type CallbackUrlsTargetArray = z.infer<typeof urlsArraySchema>;
