import z from 'zod';

export const callbackUrlSchema = z.string().url();

export const callbackUrlsArraySchema = z.array(callbackUrlSchema);
