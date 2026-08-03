import z from 'zod';
import {
  deleteStoredResourcesParamsSchema,
  deleteTaskParamsSchema,
  fsDeleteStoredResourcesParamsSchema,
  fsTilesDeletionParamsSchema,
  redisCacheDeletionParamsSchema,
  redisDeleteStoredResourcesParamsSchema,
  redisTilesDeletionParamsSchema,
  s3DeleteStoredResourcesParamsSchema,
  s3TilesDeletionParamsSchema,
  tilesDeletionParamsSchema,
} from '../../schemas/deletion/task.schema';

//#region DeleteTaskParams
export type DeleteTaskParams = z.infer<typeof deleteTaskParamsSchema>;
//#endregion DeleteTaskParams

//#region TilesDeletionParams
export type TilesDeletionParams = z.infer<typeof tilesDeletionParamsSchema>;
export type S3TilesDeletionParams = z.infer<typeof s3TilesDeletionParamsSchema>;
export type FsTilesDeletionParams = z.infer<typeof fsTilesDeletionParamsSchema>;
export type RedisTilesDeletionParams = z.infer<typeof redisTilesDeletionParamsSchema>;
//#endregion TilesDeletionParams

//#region DeleteStoredResourcesParams
export type DeleteStoredResourcesParams = z.infer<typeof deleteStoredResourcesParamsSchema>;
export type S3DeleteStoredResourcesParams = z.infer<typeof s3DeleteStoredResourcesParamsSchema>;
export type FsDeleteStoredResourcesParams = z.infer<typeof fsDeleteStoredResourcesParamsSchema>;
export type RedisDeleteStoredResourcesParams = z.infer<typeof redisDeleteStoredResourcesParamsSchema>;
//#endregion DeleteStoredResourcesParams

//#region CacheDeletionParams
export type RedisCacheDeletionParams = z.infer<typeof redisCacheDeletionParamsSchema>;
//#endregion CacheDeletionParams
