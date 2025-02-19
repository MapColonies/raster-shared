import { z, ZodType } from 'zod';
import { OperationStatus } from '@map-colonies/mc-priority-queue';
import { ExportArtifactType, SourceType } from '../../constants/export/constants';
import { multiPolygonSchema, polygonSchema } from '../core';
import { CORE_VALIDATIONS } from '../../constants';
import { RoiFeature, RoiFeatureCollection } from '../../types';

export const roiPropertiesSchema = z.object({
  maxResolutionDeg: z.number(),
  minResolutionDeg: z.number().optional().default(CORE_VALIDATIONS.resolutionDeg.max), //worst resolution
});

export const featureSchema: ZodType<RoiFeature> = z.object({
  type: z.literal('Feature'),
  geometry: polygonSchema.or(multiPolygonSchema),
  properties: roiPropertiesSchema as ZodType<RoiFeature['properties']>,
});

export const roiFeatureCollectionSchema: ZodType<RoiFeatureCollection> = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(featureSchema),
});

export const sourceSchema = z.object({
  path: z.string(),
  type: z.nativeEnum(SourceType),
  extent: z //this is optional because the merger gets 2 source- input and output. only the input has an extent
    .object({
      minX: z.number(),
      minY: z.number(),
      maxX: z.number(),
      maxY: z.number(),
    })
    .optional(),
});

export const artifactSchema = z.object({
  name: z.string(),
  type: z.nativeEnum(ExportArtifactType),
  url: z.string().optional(),
  size: z.number().optional(),
});

export const artifactsArraySchema = z.array(artifactSchema);

export const fileNamesTemplatesSchema = z.object({
  dataURI: z.string(),
  metadataURI: z.string(), // will be removed with export v2.0.0
});

export const cleanupDataSchema = z.object({
  directoryPath: z.string().optional(),
  cleanupExpirationTimeUTC: z.date().optional(),
});

export const callbackExportDataSchema = z.object({
  recordCatalogId: z.string(),
  jobId: z.string(),
  roi: roiFeatureCollectionSchema,
  links: fileNamesTemplatesSchema.optional(),
  expirationTime: z.date().optional(),
  fileSize: z.number().optional(),
  errorReason: z.string().optional(),
  description: z.string().optional(),
  artifacts: artifactsArraySchema.optional(),
});

export const callbackExportResponseSchema = callbackExportDataSchema.extend({
  status: z.union([z.literal(OperationStatus.COMPLETED), z.literal(OperationStatus.FAILED)]),
});
