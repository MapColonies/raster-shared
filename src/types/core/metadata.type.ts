import z from 'zod';
import type { aggregationFeatureSchema } from '../../schemas';

export type AggregationFeature = z.infer<typeof aggregationFeatureSchema>;
