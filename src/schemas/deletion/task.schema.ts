import { z } from 'zod';
import { SourceType } from '../../constants/core/constants';

export const sourceProviderSchema = z.union([z.literal(SourceType.S3), z.literal(SourceType.FS)]);

export const deleteTaskParamsSchema = z
  .object({
    deleteFromCatalog: z.boolean().default(false),
    deleteFromMapproxy: z.boolean().default(false),
    deleteFromGeoserver: z.boolean().default(false),
    deletePolygonParts: z.boolean().default(false),
  })
  .describe('deleteTaskParamsSchema');

export const deletionParamsBaseSchema = z.object({
  sourceProvider: sourceProviderSchema,
  bucket: z.string().optional(),
});

export const layerTilesDeletionParamsSchema = deletionParamsBaseSchema
  .extend({
    catalogId: z.string().uuid(),
  })
  .describe('layerTilesDeletionParamsSchema');

export const artifactsDeletionParamsSchema = deletionParamsBaseSchema
  .extend({
    paths: z.array(z.string().min(1)).min(1), // explicit thumbnail/legend object keys (s3) or file paths (fs)
  })
  .describe('artifactsDeletionParamsSchema');
