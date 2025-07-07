import z from 'zod';
import { inputFilesSchema, shapefilePathSchema } from './inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from './metadata.schema';

export const layerDataSchema = z.object({
  inputFiles: inputFilesSchema,
  partsDataFilePath: shapefilePathSchema,
});

export const newRasterLayerRequestSchema = layerDataSchema.extend({
  metadata: newRasterLayerMetadataSchema,
});

export const updateRasterLayerRequestSchema = layerDataSchema.extend({
  metadata: updateRasterLayerMetadataSchema,
});
