import z from 'zod';
import { inputFilesSchema } from './inputFiles.schema';
import { partSchema } from './polygonParts.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from './metadata.schema';

export const layerDataSchema = z.object({
  inputFiles: inputFilesSchema,
  partsData: z.array(partSchema),
});

export const newRasterLayerRequestSchema = layerDataSchema.extend({
  metadata: newRasterLayerMetadataSchema,
});

export const updateRasterLayerRequestSchema = layerDataSchema.extend({
  metadata: updateRasterLayerMetadataSchema,
});
