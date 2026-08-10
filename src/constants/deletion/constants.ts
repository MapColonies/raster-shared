/* eslint-disable @typescript-eslint/naming-convention */
export const DeletionJobTypes = {
  Delete_Layer: 'Delete_Layer',
  /**
   * Cache invalidation following a layer swap: the previous cache is stale in its entirety.
   * Paired with {@link DeletionTaskTypes.CacheDeletion}, whose task parameters are
   * `redisDeleteStoredResourcesParamsSchema` — the key `prefix` alone locates everything to remove.
   */
  Swap_Delete_Cache: 'Swap_Delete_Cache',
  /**
   * Cache invalidation following an in-place layer update: only the updated tiles are stale.
   * Paired with {@link DeletionTaskTypes.CacheDeletion}, whose task parameters are
   * `redisTilesDeletionParamsSchema` — the key `prefix` plus the `ranges` to invalidate.
   */
  Update_Delete_Cache: 'Update_Delete_Cache',
} as const;

export type DeletionJobTypes = (typeof DeletionJobTypes)[keyof typeof DeletionJobTypes];

export const DeletionTaskTypes = {
  Delete: 'delete',
  LayerTilesDeletion: 'tiles-deletion',
  ArtifactsDeletion: 'artifacts-deletion',
  /**
   * Removal of entries from the Redis tile cache. The parameter shape is decided by the job type
   * this task is paired with — see {@link DeletionJobTypes.Swap_Delete_Cache} and
   * {@link DeletionJobTypes.Update_Delete_Cache}.
   */
  CacheDeletion: 'cache-deletion',
} as const;

export type DeletionTaskTypes = (typeof DeletionTaskTypes)[keyof typeof DeletionTaskTypes];
/* eslint-enable @typescript-eslint/naming-convention */
