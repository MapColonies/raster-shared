import { z } from 'zod';
import { CORE_VALIDATIONS, TileFormatStrategy, TileOutputFormat } from '../../constants';
import { polygonPartsEntityNameSchema } from '../ingestion';
import { callbackUrlsArraySchema } from '../core/callbackUrl.schema';
import { callbackExportResponseSchema, cleanupDataSchema, roiFeatureCollectionSchema, fileNamesTemplatesSchema } from './export.schema';

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
    jobTrackerServiceURL: z.string().regex(new RegExp(CORE_VALIDATIONS.url.pattern), CORE_VALIDATIONS.url.description),
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
