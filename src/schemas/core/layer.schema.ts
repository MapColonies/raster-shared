import { RasterLinkType, RecordStatus, RecordType } from '@map-colonies/types';
import { z, type ZodType } from 'zod';
import { CORE_VALIDATIONS, GEODETIC_GRIDS, MAX_ZOOM_LEVEL, RasterProductTypes, TileOutputFormat, Transparency } from '../../constants';
import { multiPolygonSchema, polygonSchema } from './geo.schema';
import { urlSchema } from './link.schema';
import { tilesMimeFormatSchema } from './mime.schema';
import { partObjectSchema } from './polygonParts.schema';
import { fsStorageSchema, redisStorageSchema, s3StorageSchema } from './storage.schema';

const layerIdSchema = z.string().uuid();
const revisionIdSchema = z.string().uuid();

const redisTilesetStorageParamsSchema = z.object({ ttl: z.number().int().min(0).optional() }).strict();

export const productTypeSchema: ZodType<RasterProductTypes> = z.nativeEnum(RasterProductTypes);
export const resourceIdSchema = z
  .string()
  .regex(new RegExp(CORE_VALIDATIONS.productId.pattern), {
    message: 'Product ID must start with a letter and contain only letters, numbers and underscores',
  })
  .describe(CORE_VALIDATIONS.productId.description);
export const versionSchema = z
  .string()
  .regex(new RegExp(CORE_VALIDATIONS.productVersion.pattern), { message: 'Product version in the format "x.y", e.g. "1.0"' })
  .describe(CORE_VALIDATIONS.productVersion.description);

export const layerSchema = z
  .object({
    id: layerIdSchema,
    productId: resourceIdSchema,
    productType: productTypeSchema,
    recordType: z.literal(RecordType.RECORD_RASTER),
    productStatus: z.nativeEnum(RecordStatus),
  })
  .strict()
  .describe('layerSchema');

export const layerRevisionObjectSchema = z
  .object({
    layerId: layerIdSchema,
    currentRevisionId: revisionIdSchema,
    rollbackRevisionId: revisionIdSchema.optional(),
  })
  .strict()
  .describe('layerRevisionObjectSchema');

export const layerRevisionSchema = layerRevisionObjectSchema
  .refine(({ currentRevisionId, rollbackRevisionId }) => currentRevisionId !== rollbackRevisionId, {
    message: 'Current revision id should be different from rollback revision id',
  })
  .describe('layerRevisionSchema');

export const linkSchema = z
  .object({
    id: z.string().uuid(),
    layerId: layerIdSchema,
    linkType: z.nativeEnum(RasterLinkType),
    url: urlSchema,
    description: z.string().optional(),
  })
  .strict()
  .describe('linkSchema');

export const tilesetBaseSchema = z
  .object({
    id: z.string().uuid(),
    layerId: layerIdSchema,
    displayPath: z.string().uuid(),
    tileMimeFormat: tilesMimeFormatSchema,
    tileOutputFormat: z.nativeEnum(TileOutputFormat),
    upscaleZoomLevels: z.number().int().min(0).max(MAX_ZOOM_LEVEL).optional(),
    grids: z.array(z.string().min(1)).refine((grids) => grids.every((grid) => GEODETIC_GRIDS.includes(grid)), { message: 'Grid is unsupported' }),
  })
  .strict()
  .describe('tilesetBaseSchema');

export const tilesetSchema = z
  .discriminatedUnion('storageProvider', [
    tilesetBaseSchema
      .merge(fsStorageSchema.pick({ storageProvider: true }))
      .merge(z.object({ storageParams: fsStorageSchema.omit({ storageProvider: true }) }))
      .strict(),
    tilesetBaseSchema
      .merge(s3StorageSchema.pick({ storageProvider: true }))
      .merge(z.object({ storageParams: s3StorageSchema.omit({ storageProvider: true }) }))
      .strict(),
    tilesetBaseSchema
      .merge(redisStorageSchema.pick({ storageProvider: true }))
      .merge(z.object({ storageParams: redisStorageSchema.omit({ storageProvider: true }).merge(redisTilesetStorageParamsSchema) }))
      .strict(),
  ])
  .describe('tilesetSchema');

export const revisionObjectSchema = z
  .object({
    id: revisionIdSchema,
    layerId: layerIdSchema,
    productVersionMajor: z.number().int().min(1),
    productVersionMinor: z.number().int().min(0),
    ingestionDateUTC: z.coerce.date(),
    updateDateUTC: z.coerce.date(),
    maxResolutionDeg: partObjectSchema.shape.resolutionDegree,
    minResolutionDeg: partObjectSchema.shape.resolutionDegree,
    maxResolutionMeter: partObjectSchema.shape.sourceResolutionMeter,
    minResolutionMeter: partObjectSchema.shape.sourceResolutionMeter,
    maxHorizontalAccuracyCE90: partObjectSchema.shape.horizontalAccuracyCE90,
    minHorizontalAccuracyCE90: partObjectSchema.shape.horizontalAccuracyCE90,
    srs: z.literal('4326'),
    srsName: z.literal('WGS84GEO'),
    region: z.array(z.string().min(1)).min(1),
    classification: z
      .string()
      .regex(new RegExp(CORE_VALIDATIONS.classification.pattern), { message: 'Classification value must be between 0 and 100' }),
    transparency: z.nativeEnum(Transparency),
    description: z.string().optional(),
    productName: z.string().min(1),
    productSubType: z.string().min(1).optional(),
    producerName: z.string().min(1).optional(),
    scale: z.number().min(CORE_VALIDATIONS.scale.min).max(CORE_VALIDATIONS.scale.max).optional(),
    keywords: z.array(z.string().min(1)).optional(),
    footprint: polygonSchema.or(multiPolygonSchema),
  })
  .merge(
    partObjectSchema.pick({
      imagingTimeBeginUTC: true,
      imagingTimeEndUTC: true,
      sensors: true,
    })
  )
  .strict();

export const revisionSchema = revisionObjectSchema
  .refine(({ imagingTimeBeginUTC, imagingTimeEndUTC }) => imagingTimeBeginUTC <= imagingTimeEndUTC && imagingTimeEndUTC <= new Date(), {
    message: 'Imaging time begin UTC should be less than or equal to imaging time end UTC and both less than or equal to current timestamp',
  })
  .refine(({ maxHorizontalAccuracyCE90, minHorizontalAccuracyCE90 }) => maxHorizontalAccuracyCE90 <= minHorizontalAccuracyCE90, {
    message: 'Max horizontal accuracy CE90 should be less than or equal to min horizontal accuracy CE90',
  })
  .refine(({ maxResolutionDeg, minResolutionDeg }) => maxResolutionDeg <= minResolutionDeg, {
    message: 'Max resolution degree should be less than or equal to min resolution degree',
  })
  .refine(({ maxResolutionMeter, minResolutionMeter }) => maxResolutionMeter <= minResolutionMeter, {
    message: 'Max resolution meter should be less than or equal to min resolution meter',
  })
  .describe('revisionSchema');
