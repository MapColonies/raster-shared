import { z, ZodType } from 'zod';
import { OperationStatus } from '@map-colonies/mc-priority-queue';
import { Artifact } from '@map-colonies/types';
import { ExportArtifactType } from '../../constants/export/constants';
import { featureCollectionSchema, featureSchema, multiPolygonSchema, polygonSchema } from '../core';
import { CORE_VALIDATIONS } from '../../constants';
import type { RoiFeature, RoiFeatureCollection } from '../../types';

export const roiPropertiesSchema = z.object({
  maxResolutionDeg: z.number(),
  minResolutionDeg: z.number().optional().default(CORE_VALIDATIONS.resolutionDeg.max), //worst resolution
});

export const roiFeatureSchema: ZodType<RoiFeature> = featureSchema(
  polygonSchema.or(multiPolygonSchema),
  roiPropertiesSchema as ZodType<RoiFeature['properties']>
);

export const roiFeatureCollectionSchema: ZodType<RoiFeatureCollection> = featureCollectionSchema(roiFeatureSchema);

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
  metadataURI: z.string(), //TODO: remove metadataURI when we remove metadata json support
});

export const callbackExportDataSchema = z.object({
  recordCatalogId: z.string(),
  jobId: z.string(),
  roi: roiFeatureCollectionSchema,
  links: linksSchema.optional(),
  expirationTime: z.coerce.date().optional(),
  fileSize: z.number().optional(),
  jsonFileData: z.object({ size: z.number().optional(), sha256: z.string().optional() }).optional(), // TODO: remove when we remove metadata json support
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
