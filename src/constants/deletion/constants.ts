/* eslint-disable @typescript-eslint/naming-convention */
export const DeletionJobTypes = {
  Delete_Layer: 'Delete_Layer',
} as const;

export type DeletionJobTypes = (typeof DeletionJobTypes)[keyof typeof DeletionJobTypes];

export const DeletionTaskTypes = {
  Delete: 'delete',
  LayerTilesDeletion: 'tiles-deletion',
  ArtifactsDeletion: 'artifacts-deletion',
} as const;

export type DeletionTaskTypes = (typeof DeletionTaskTypes)[keyof typeof DeletionTaskTypes];
/* eslint-enable @typescript-eslint/naming-convention */
