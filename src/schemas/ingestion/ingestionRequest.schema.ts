import z, { late } from 'zod';
import { inputFilesSchema } from './inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from './metadata.schema';

export const layerDataSchema = z.object({
  inputFiles: inputFilesSchema,
});

export const newRasterLayerRequestSchema = layerDataSchema.extend({
  metadata: newRasterLayerMetadataSchema,
});

export const updateRasterLayerRequestSchema = layerDataSchema.extend({
  metadata: updateRasterLayerMetadataSchema,
});
