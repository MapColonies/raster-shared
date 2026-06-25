import { z } from 'zod';

export const deleteLayerJobParamsSchema = z
  .object({
    approver: z.string(),
  })
  .describe('deleteLayerJobParamsSchema');
