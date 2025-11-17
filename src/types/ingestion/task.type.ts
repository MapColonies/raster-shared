import z from 'zod';
import {
  ingestionNewFinalizeTaskParamsSchema,
  ingestionSwapUpdateTaskParamsSchema,
  ingestionUpdateFinalizeTaskParamsSchema,
  ingestionValidationTaskParamsSchema,
} from '../../schemas';

//#region IngestionFinalizeTaskParams
export type IngestionNewFinalizeTaskParams = z.infer<typeof ingestionNewFinalizeTaskParamsSchema>;
export type IngestionUpdateFinalizeTaskParams = z.infer<typeof ingestionUpdateFinalizeTaskParamsSchema>;
export type IngestionSwapUpdateFinalizeTaskParams = z.infer<typeof ingestionSwapUpdateTaskParamsSchema>;
//#endregion

//#region IngestionValidationTaskParams
export type IngestionValidationTaskParams = z.infer<typeof ingestionValidationTaskParamsSchema>;
//#endregion
