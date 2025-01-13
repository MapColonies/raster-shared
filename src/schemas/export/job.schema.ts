import { z } from 'zod';
import { callbackExportResponseSchema, cleanupDataSchema, featureCollectionSchema, fileNamesTemplatesSchema } from './export.schema';
import { TileFormatStrategy, TileOutputFormat } from '../../constants';

export const callbackSchema = z.object({
  url: z.string().url(),
  roi: featureCollectionSchema,
});

export const callbacksArraySchema = z.array(callbackSchema);

export const exportInputParamsSchema = z.object({
  crs: z.string(z.literal('EPSG:4326')),
  roi: featureCollectionSchema,
  callbacks: callbacksArraySchema.optional(),
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
