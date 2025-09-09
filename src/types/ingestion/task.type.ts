import z from 'zod';
import { ingestionNewFinalizeTaskParamsSchema, ingestionSwapUpdateTaskParamsSchema, ingestionUpdateFinalizeTaskParamsSchema } from '../../schemas';

//#region IngestionFinalizeTaskParams
export type IngestionNewFinalizeTaskParams = z.infer<typeof ingestionNewFinalizeTaskParamsSchema>;
export type IngestionUpdateFinalizeTaskParams = z.infer<typeof ingestionUpdateFinalizeTaskParamsSchema>;
export type IngestionSwapUpdateFinalizeTaskParams = z.infer<typeof ingestionSwapUpdateTaskParamsSchema>;
//#endregion
