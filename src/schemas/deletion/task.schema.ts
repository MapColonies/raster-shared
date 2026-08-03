import { z } from 'zod';
import { StorageProvider } from '../../constants/core/constants';
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
export const s3TilesDeletionParamsSchema = s3StorageSchema.merge(tilePyramidSchema).merge(tileRangesSchema);

// Unlike the other providers this does NOT extend fsStorageSchema: tile deletion
// locates tiles by `tilesPath`, not by the layer's `subPath`.
export const fsTilesDeletionParamsSchema = z
  .object({
    storageProvider: z.literal(StorageProvider.FS),
  })
  .merge(tilePyramidSchema)
  .merge(tileRangesSchema);

export const redisTilesDeletionParamsSchema = redisDeletionBaseSchema.merge(tileRangesSchema).strict(); // Reject path-store fields outright: a prefix store has no tilesPath

export const tilesDeletionParamsSchema = z.discriminatedUnion('storageProvider', [
  s3TilesDeletionParamsSchema,
  fsTilesDeletionParamsSchema,
  redisTilesDeletionParamsSchema,
]);
//#endregion TilesDeletionParams

//#region DeleteStoredResourcesParams
/** Paths to delete recursively. Meaningful only for path-based stores. */
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

//#region CacheDeletionParams
/**
 * Params of the single `cache-deletion` task. The two shapes are told apart by their
 * fields rather than by the task type: `ranges` present means range-based deletion,
 * `prefix` alone means a whole-layer wipe. Both members are `.strict()`, so at most
 * one can ever match — `ranges` is required on the first and rejected as an unknown
 * key by the second.
 */
export const redisCacheDeletionParamsSchema = z
  .union([redisTilesDeletionParamsSchema, redisDeleteStoredResourcesParamsSchema])
  .describe('redisCacheDeletionParamsSchema');
//#endregion CacheDeletionParams
