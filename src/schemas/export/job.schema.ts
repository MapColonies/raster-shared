import { z } from 'zod';
import { TileFormatStrategy, TileOutputFormat } from '../../constants';
import { callbackExportResponseSchema, cleanupDataSchema, featureCollectionSchema, fileNamesTemplatesSchema } from './export.schema';

export const callbackUrlSchema = z.object({
  url: z.string().url(),
});

export const callbackUrlsArraySchema = z.array(callbackUrlSchema);

export const exportInputParamsSchema = z.object({
  crs: z.string(z.literal('EPSG:4326')),
  roi: featureCollectionSchema,
  callbackUrls: callbackUrlsArraySchema.optional(),
});

export const exportAdditionalParamsSchema = z.object({
  fileNamesTemplates: fileNamesTemplatesSchema,
  relativeDirectoryPath: z.string(),
  packageRelativePath: z.string(),
  gpkgEstimatedSize: z.number(),
  targetFormat: z.nativeEnum(TileOutputFormat),
  outputFormatStrategy: z.nativeEnum(TileFormatStrategy),
});

export const exportJobParametersSchema = z
  .object({
    exportInputParams: exportInputParamsSchema,
    additionalParams: exportAdditionalParamsSchema,
    cleanupDataParams: cleanupDataSchema.optional(),
    callbackParams: callbackExportResponseSchema.optional(),
  })
  .describe('exportJobParametersSchema');
