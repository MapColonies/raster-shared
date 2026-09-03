/* eslint-disable @typescript-eslint/naming-convention */
export const DeletionJobTypes = {
  Delete_Layer: 'Delete_Layer',
  Swap_Delete_Cache: 'Swap_Delete_Cache',
  Update_Delete_Cache: 'Update_Delete_Cache',
} as const;

export type DeletionJobTypes = (typeof DeletionJobTypes)[keyof typeof DeletionJobTypes];

export const DeletionTaskTypes = {
  Delete: 'delete',
  LayerTilesDeletion: 'tiles-deletion',
  ArtifactsDeletion: 'artifacts-deletion',
} as const;

export type DeletionTaskTypes = (typeof DeletionTaskTypes)[keyof typeof DeletionTaskTypes];
