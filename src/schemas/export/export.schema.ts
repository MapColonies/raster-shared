import { FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import { z } from 'zod';
import { OperationStatus } from '@map-colonies/mc-priority-queue';
import { ArtifactType, SourceType } from '../../constants/export/constants';

const featureSchema = z.object({
  type: z.literal('Feature'),
  geometry: z.custom<Polygon | MultiPolygon>(),
  properties: z.object({
    maxResolutionDeg: z.number(),
    minResolutionDeg: z.number().optional(),
  }),
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
  type: z.nativeEnum(ArtifactType),
  url: z.string().optional(),
  size: z.number().optional(),
});

export const artifactsArraySchema = z.array(artifactSchema);

export const baseFeatureCollectionSchema = z.object({
  type: z.string(z.literal('FeatureCollection')),
  features: z.array(featureSchema),
});

export const featureCollectionSchema = z.custom<FeatureCollection>(
  (value) => {
    // Perform type check (runtime validation)
    const baseValidation = baseFeatureCollectionSchema.safeParse(value);
    return baseValidation.success;
  },
  {
    message: 'Invalid FeatureCollection',
  }
);

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
  roi: featureCollectionSchema,
  links: fileNamesTemplatesSchema.optional(),
  expirationTime: z.date().optional(),
  fileSize: z.number().optional(),
  errorReason: z.string().optional(),
  description: z.string().optional(),
  artifacts: artifactsArraySchema.optional(),
});

export const callbackExportResponseSchema = callbackExportDataSchema.extend({
  status: z.union([z.literal(OperationStatus.IN_PROGRESS), z.literal(OperationStatus.COMPLETED), z.literal(OperationStatus.FAILED)]),
});
