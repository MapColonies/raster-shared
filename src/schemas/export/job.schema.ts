import { z } from 'zod';
import { CORE_VALIDATIONS, TileFormatStrategy, TileOutputFormat } from '../../constants';
import { polygonPartsEntityNameSchema } from '../ingestion';
import { callbackExportResponseSchema, cleanupDataSchema, roiFeatureCollectionSchema, fileNamesTemplatesSchema } from './export.schema';

export const callbackUrlSchema = z.object({
  url: z.string().url(),
});

export const callbackUrlsArraySchema = z.array(callbackUrlSchema); // TODO: remove when all services use the same callback schema( currently ingestion uses urlsArraySchema and export uses callbackUrlSchema)

export const exportInputParamsSchema = z.object({
  crs: z.string(z.literal('EPSG:4326')),
  roi: roiFeatureCollectionSchema,
  callbackUrls: callbackUrlsArraySchema.optional(),
});

export const exportAdditionalParamsSchema = z
  .object({
    fileNamesTemplates: fileNamesTemplatesSchema,
    relativeDirectoryPath: z.string(),
    packageRelativePath: z.string(),
    gpkgEstimatedSize: z.number(),
    targetFormat: z.nativeEnum(TileOutputFormat),
    outputFormatStrategy: z.nativeEnum(TileFormatStrategy),
    jobTrackerServiceURL: z.string().regex(new RegExp(CORE_VALIDATIONS.url.pattern), { message: 'URL must start with http:// or https://' }),
  })
  .merge(polygonPartsEntityNameSchema);

export const exportJobParametersSchema = z
  .object({
    exportInputParams: exportInputParamsSchema,
    additionalParams: exportAdditionalParamsSchema,
    cleanupDataParams: cleanupDataSchema.optional(),
    callbackParams: callbackExportResponseSchema.optional(),
  })
  .describe('exportJobParametersSchema');
