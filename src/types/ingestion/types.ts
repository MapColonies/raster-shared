import z from 'zod';
import { inputFilesSchema } from '../../schemas/ingestion/inputFiles.schema';
import { partSchema } from '../../schemas/ingestion/polygonParts.schema';
import { aggregationMetadataSchema, newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from '../../schemas/ingestion/metadata.schema';
import { layerDataSchema, newRasterLayerRequestSchema, updateRasterLayerRequestSchema } from '../../schemas/ingestion/ingestionRequest.schema';
import {
  ingestionNewJobParamsSchema,
  ingestionSwapUpdateJobParamsSchema,
  ingestionUpdateJobParamsSchema,
} from '../../schemas/ingestion/ingestionJobParams.schema';
import {
  ingestionNewFinalizeTaskParamsSchema,
  ingestionSwapUpdateTaskParamsSchema,
  ingestionUpdateFinalizeTaskParamsSchema,
} from '../../schemas/ingestion/ingestionTaskParams.schema';

//#region LayerData
export type InputFiles = z.infer<typeof inputFilesSchema>;
export type LayerData = z.infer<typeof layerDataSchema>;
export type NewRasterLayerMetadata = z.infer<typeof newRasterLayerMetadataSchema>;
export type UpdateRasterLayerMetadata = z.infer<typeof updateRasterLayerMetadataSchema>;
export type AggregationLayerMetadata = z.infer<typeof aggregationMetadataSchema>;
// #endregion

//#region PolygonParts
export type PolygonPart = z.infer<typeof partSchema>;
//#endregion

//#region LayerRequests
export type IngestionNewLayerRequest = z.infer<typeof newRasterLayerRequestSchema>;
export type IngestionUpdateLayerRequest = z.infer<typeof updateRasterLayerRequestSchema>;
//#endregion

//#region IngestionJobParams
export type IngestionNewJobParams = z.infer<typeof ingestionNewJobParamsSchema>;
export type IngestionUpdateJobParams = z.infer<typeof ingestionUpdateJobParamsSchema>;
export type IngestionSwapUpdateJobParams = z.infer<typeof ingestionSwapUpdateJobParamsSchema>;
//#endregion

//#region IngestionFinalizeTaskParams
export type IngestionNewFinalizeTaskParams = z.infer<typeof ingestionNewFinalizeTaskParamsSchema>;
export type IngestionUpdateFinalizeTaskParams = z.infer<typeof ingestionUpdateFinalizeTaskParamsSchema>;
export type IngestionSwapUpdateFinalizeTaskParams = z.infer<typeof ingestionSwapUpdateTaskParamsSchema>;
//#endregion
