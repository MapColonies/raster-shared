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

export const layerTilesDeletionParamsSchema = z
  .object({
    catalogId: z.string().uuid(),
    sourceProvider: sourceProviderSchema,
  })
  .describe('layerTilesDeletionParamsSchema');

export const artifactsDeletionParamsSchema = z
  .object({
    sourceProvider: sourceProviderSchema,
    paths: z.array(z.string().min(1)).min(1), // explicit thumbnail/legend object keys (s3) or file paths (fs)
  })
  .describe('artifactsDeletionParamsSchema');
