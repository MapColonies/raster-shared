import z from 'zod';
import type { aggregationFeatureSchema } from '../../schemas';
import type { rasterLayerCatalogSchema } from '../../schemas/core/layer.schema';

export type RasterLayerCatalog = z.infer<typeof rasterLayerCatalogSchema>;
export type AggregationFeature = z.infer<typeof aggregationFeatureSchema>;
