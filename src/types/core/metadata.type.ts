import z from 'zod';
import { aggregationFeatureSchema } from '../../schemas';
import type { rasterLayerMetadataSchema } from '../../schemas/core/metadata.schema';

export type RasterLayerMetadata = z.infer<typeof rasterLayerMetadataSchema>;
export type AggregationFeature = z.infer<typeof aggregationFeatureSchema>;
