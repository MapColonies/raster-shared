import { newAdditionalParamsSchema, swapUpdateAdditionalParamsSchema, updateAdditionalParamsSchema } from './additionalParams.schema';
import { newRasterLayerRequestSchema, updateRaterLayerRequestSchema } from './ingestionRequest.schema';

export const ingestionNewJobParamsSchema = newRasterLayerRequestSchema
  .extend({
    additionalParams: newAdditionalParamsSchema,
  })
  .describe('ingestionNewJobParamsSchema');

export const ingestionUpdateJobParamsSchema = updateRaterLayerRequestSchema
  .extend({
    additionalParams: updateAdditionalParamsSchema,
  })
  .describe('ingestionUpdateJobParamsSchema');

export const ingestionSwapUpdateJobParamsSchema = updateRaterLayerRequestSchema
  .extend({
    additionalParams: swapUpdateAdditionalParamsSchema,
  })
  .describe('ingestionSwapUpdateParamsSchema');
