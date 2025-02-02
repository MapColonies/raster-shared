import { newAdditionalParamsSchema, swapUpdateAdditionalParamsSchema, updateAdditionalParamsSchema } from './additionalParams.schema';
import { newRasterLayerRequestSchema, updateRasterLayerRequestSchema } from './ingestionRequest.schema';

export const ingestionNewJobParamsSchema = newRasterLayerRequestSchema
  .extend({
    additionalParams: newAdditionalParamsSchema,
  })
  .describe('ingestionNewJobParamsSchema');

export const ingestionUpdateJobParamsSchema = updateRasterLayerRequestSchema
  .extend({
    additionalParams: updateAdditionalParamsSchema,
  })
  .describe('ingestionUpdateJobParamsSchema');

export const ingestionSwapUpdateJobParamsSchema = updateRasterLayerRequestSchema
  .extend({
    additionalParams: swapUpdateAdditionalParamsSchema,
  })
  .describe('ingestionSwapUpdateParamsSchema');
