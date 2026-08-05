import { z } from 'zod';
import { fsStorageSchema, redisStorageSchema, s3StorageSchema } from '../core/storage.schema';
import { tilePyramidSchema, tileRangesSchema } from '../core/tile.schema';

/**
 * Shared by every Redis deletion shape: the key prefix that locates the entries, plus an
 * optional wait for a mapproxy reload to settle before the keys are removed.
 */
const redisDeletionBaseSchema = redisStorageSchema.extend({
  delaySeconds: z.number().int().nonnegative().optional(),
});

//#region DeleteTaskParams
export const deleteTaskParamsSchema = z
  .object({
    deleteFromCatalog: z.boolean().default(false),
    deleteFromMapproxy: z.boolean().default(false),
    deleteFromGeoserver: z.boolean().default(false),
    deletePolygonParts: z.boolean().default(false),
  })
  .describe('deleteTaskParamsSchema');
//#endregion DeleteTaskParams

//#region TilesDeletionParams
export const s3TilesDeletionParamsSchema = s3StorageSchema.merge(tilePyramidSchema).strict();

export const fsTilesDeletionParamsSchema = fsStorageSchema.merge(tilePyramidSchema).strict();

export const redisTilesDeletionParamsSchema = redisDeletionBaseSchema.merge(tileRangesSchema).strict();

export const tilesDeletionParamsSchema = z
  .discriminatedUnion('storageProvider', [s3TilesDeletionParamsSchema, fsTilesDeletionParamsSchema, redisTilesDeletionParamsSchema])
  .describe('tilesDeletionParamsSchema');
//#endregion TilesDeletionParams

//#region DeleteStoredResourcesParams
export const resourcePathsSchema = z.object({
  paths: z.array(z.string().min(1)).min(1),
});

export const s3DeleteStoredResourcesParamsSchema = s3StorageSchema.merge(resourcePathsSchema);

export const fsDeleteStoredResourcesParamsSchema = fsStorageSchema.merge(resourcePathsSchema);

// The prefix IS the locator for a key-value store, so `paths` is meaningless here
// and is rejected outright rather than silently stripped.
export const redisDeleteStoredResourcesParamsSchema = redisDeletionBaseSchema.strict();

export const deleteStoredResourcesParamsSchema = z
  .discriminatedUnion('storageProvider', [
    s3DeleteStoredResourcesParamsSchema,
    fsDeleteStoredResourcesParamsSchema,
    redisDeleteStoredResourcesParamsSchema,
  ])
  .describe('deleteStoredResourcesParamsSchema');
//#endregion DeleteStoredResourcesParams
