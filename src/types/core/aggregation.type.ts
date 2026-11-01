import type { z } from 'zod';
import type { aggregationFeatureSchema } from '../../schemas/core/aggregation.schema';

export type AggregationFeature = z.infer<typeof aggregationFeatureSchema>;
