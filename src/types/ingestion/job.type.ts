import { z } from 'zod';
import { ingestionNewJobParamsSchema, ingestionSwapUpdateJobParamsSchema, ingestionUpdateJobParamsSchema } from '../../schemas';

//#region IngestionJobParams
export type IngestionNewJobParams = z.infer<typeof ingestionNewJobParamsSchema>;
export type IngestionUpdateJobParams = z.infer<typeof ingestionUpdateJobParamsSchema>;
export type IngestionSwapUpdateJobParams = z.infer<typeof ingestionSwapUpdateJobParamsSchema>;
//#endregion
