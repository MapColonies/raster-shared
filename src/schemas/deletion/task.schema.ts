import { z } from 'zod';
import { SourceType } from '../../constants/core/constants';
import { storageSchema } from '../core';

export const sourceProviderSchema = z.union([z.literal(SourceType.S3), z.literal(SourceType.FS)]);

export const deleteTaskParamsSchema = z
  .object({
    deleteFromCatalog: z.boolean().default(false),
    deleteFromMapproxy: z.boolean().default(false),
    deleteFromGeoserver: z.boolean().default(false),
    deletePolygonParts: z.boolean().default(false),
  })
  .describe('deleteTaskParamsSchema');

export const deleteStoredResourcesParamsBaseSchema = z.object({
  paths: z.array(z.string().min(1)).min(1),
});

export const deleteStoredResourcesParamsSchema = deleteStoredResourcesParamsBaseSchema
  .and(storageSchema)
  .describe('deleteStoredResourcesParamsSchema');
