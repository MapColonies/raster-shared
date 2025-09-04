import z from 'zod';
import { callbackUrlsArraySchema } from '../core/callbackUrl.schema';
import { inputFilesSchema } from './inputFiles.schema';
import { newRasterLayerMetadataSchema, updateRasterLayerMetadataSchema } from './metadata.schema';

export const callbackUrlsSchema = callbackUrlsArraySchema.optional();

export const layerDataSchema = z.object({
  inputFiles: inputFilesSchema,
});

export const newRasterLayerRequestSchema = layerDataSchema.extend({
  metadata: newRasterLayerMetadataSchema,
  callbackUrls: callbackUrlsSchema,
});

export const updateRasterLayerRequestSchema = layerDataSchema.extend({
  metadata: updateRasterLayerMetadataSchema,
  callbackUrls: callbackUrlsSchema,
});
