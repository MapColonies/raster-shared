import z from 'zod';
import { validationCallbackDataSchema } from '../../schemas/ingestion/callback.schema';

export type ValidationCallbackData = z.infer<typeof validationCallbackDataSchema>;
