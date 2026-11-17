import z from 'zod';
import { inputFilesSchema } from '../../schemas/ingestion/inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from '../../schemas/ingestion/layer.schema';

//#region LayerData
export type InputFiles = z.infer<typeof inputFilesSchema>;
export type NewRasterLayerMetadata = z.infer<typeof newRasterLayerMetadataSchema>;
export type UpdateRasterLayerMetadata = z.infer<typeof updateRasterLayerMetadataSchema>;
// #endregion
