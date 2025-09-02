import z, { late } from 'zod';
import { inputFilesSchema } from './inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from './metadata.schema';
import { callbackUrlsArraySchema } from '../core/callbackUrl.schema';

export const callbackUrlsSchema = z.object({
  callbackUrls: callbackUrlsArraySchema.optional(),
});

export const layerDataSchema = z.object({
  inputFiles: inputFilesSchema,
});

export const newRasterLayerRequestSchema = layerDataSchema.merge(callbackUrlsSchema).extend({
  metadata: newRasterLayerMetadataSchema,
});

export const updateRasterLayerRequestSchema = layerDataSchema.merge(callbackUrlsSchema).extend({
  metadata: updateRasterLayerMetadataSchema,
});
