import z from 'zod';
import { validationTaskCallbackDataSchema } from '../../schemas/ingestion/callback.schema';

export type ValidationCallbackData = z.infer<typeof validationTaskCallbackDataSchema>;
