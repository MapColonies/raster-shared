import z from 'zod';
import { partSchema } from '../../schemas';

export type PartFeatureProperties = z.infer<typeof partSchema>;
