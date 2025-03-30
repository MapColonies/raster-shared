import { z, ZodType } from 'zod';
import { OperationStatus } from '@map-colonies/mc-priority-queue';
import { Artifact } from '@map-colonies/types';
import { ExportArtifactType } from '../../constants/export/constants';
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

export const artifactSchema: ZodType<Artifact> = z.object({
  name: z.string(),
  type: z.nativeEnum(ExportArtifactType),
  url: z.string(),
  size: z.number(),
  sha256: z.string().optional(),
});

export const artifactsArraySchema = z.array(artifactSchema);

export const fileNamesTemplatesSchema = z.object({
  packageName: z.string(),
});

export const cleanupDataSchema = z.object({
  directoryPath: z.string().optional(),
  cleanupExpirationTimeUTC: z.coerce.date().optional(),
});

export const linksSchema = z.object({
  dataURI: z.string(),
});

export const callbackExportDataSchema = z.object({
  recordCatalogId: z.string(),
  jobId: z.string(),
  roi: roiFeatureCollectionSchema,
  links: linksSchema.optional(),
  expirationTime: z.coerce.date().optional(),
  fileSize: z.number().optional(),
  errorReason: z.string().optional(),
  description: z.string().optional(),
  artifacts: artifactsArraySchema.optional(),
});

export const callbacksStatus = z.union([
  z.literal(OperationStatus.COMPLETED),
  z.literal(OperationStatus.FAILED),
  z.literal(OperationStatus.IN_PROGRESS),
]);

export const callbackExportResponseSchema = callbackExportDataSchema.extend({
  status: callbacksStatus,
});
