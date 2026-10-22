import { z } from 'zod';

export const deleteLayerJobParamsSchema = z
  .object({
    approver: z.string(),
  })
  .describe('deleteLayerJobParamsSchema');

//#region CacheDeletionJobParams
export const cacheDeletionJobParamsSchema = z
  .object({
    ingestionJobId: z.string().uuid(),
    tasksCreationCompleted: z.boolean(),
  })
  .describe('cacheDeletionJobParamsSchema');
//#endregion CacheDeletionJobParams
