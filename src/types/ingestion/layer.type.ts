import z from 'zod';
import { inputFilesSchema } from '../../schemas/ingestion/inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from '../../schemas/ingestion/metadata.schema';
import { layerDataSchema } from '../../schemas/ingestion/layerData.schema';

//#region LayerData
export type InputFiles = z.infer<typeof inputFilesSchema>;
export type LayerData = z.infer<typeof layerDataSchema>;
export type NewRasterLayerMetadata = z.infer<typeof newRasterLayerMetadataSchema>;
export type UpdateRasterLayerMetadata = z.infer<typeof updateRasterLayerMetadataSchema>;
// #endregion
