import z from 'zod';
import { createCallbackResponseSchema } from '../../schemas';

export type CallbackResponse<T> = z.infer<ReturnType<typeof createCallbackResponseSchema<T>>>;
