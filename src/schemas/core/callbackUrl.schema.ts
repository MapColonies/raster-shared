import z from 'zod';

export const callbackUrlSchema = z.object({
  url: z.string().url(),
});

export const callbackUrlsArraySchema = z.array(callbackUrlSchema);
