import type {
  BBox,
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  Position,
} from 'geojson';
import { z, ZodType, type ZodObject } from 'zod';
import { firstAndLastPositionsEquality } from '../../utils/geo';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const longitudeSchema = z.number().min(-180).max(180);
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const latitudeSchema = z.number().min(-90).max(90);

export const positionSchema: ZodType<Position> = z.tuple([longitudeSchema, latitudeSchema]);

export const bboxSchema: ZodType<BBox> = z.tuple([longitudeSchema, latitudeSchema, longitudeSchema, latitudeSchema]);

export const pointSchema: ZodType<Point> = z.object({
  type: z.literal('Point'),
  coordinates: positionSchema,
  bbox: bboxSchema.optional(),
});

export const multiPointSchema: ZodType<MultiPoint> = z.object({
  type: z.literal('MultiPoint'),
  coordinates: z.array(positionSchema).min(1),
  bbox: bboxSchema.optional(),
});

export const lineStringSchema: ZodType<LineString> = z.object({
  type: z.literal('LineString'),
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  coordinates: z.array(positionSchema).min(2),
  bbox: bboxSchema.optional(),
});

export const multiLineStringSchema: ZodType<MultiLineString> = z.object({
  type: z.literal('MultiLineString'),
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  coordinates: z.array(z.array(positionSchema).min(2)).min(1),
  bbox: bboxSchema.optional(),
});

export const polygonSchema: ZodType<Polygon> = z.object({
  type: z.literal('Polygon'),
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  coordinates: z
    .array(z.array(positionSchema).min(4).refine(firstAndLastPositionsEquality, { message: 'First and last position are not equivalent' }))
    .min(1),
  bbox: bboxSchema.optional(),
});

export const multiPolygonSchema: ZodType<MultiPolygon> = z.object({
  type: z.literal('MultiPolygon'),
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  coordinates: z.array(z.array(z.array(positionSchema).min(4).refine(firstAndLastPositionsEquality)).min(1)).min(1),
  bbox: bboxSchema.optional(),
});

export const geometryCollectionSchema: ZodType<GeometryCollection> = z.object({
  type: z.literal('GeometryCollection'),
  geometries: z.array(z.lazy(() => geometrySchema)),
  bbox: bboxSchema.optional(),
});

export const geometrySchema = z.union([
  pointSchema,
  multiPointSchema,
  lineStringSchema,
  multiLineStringSchema,
  polygonSchema,
  multiPolygonSchema,
  geometryCollectionSchema,
]);

export const featureSchema = <G extends Geometry | null, P extends GeoJsonProperties>(
  geometrySchema: ZodType<G>,
  propertiesSchema: ZodType<P>
): ZodObject<{
  type: z.ZodLiteral<'Feature'>;
  id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
  geometry: ZodType<G>;
  properties: ZodType<P>;
}> =>
  z.object({
    type: z.literal('Feature'),
    id: z.string().or(z.number()).optional(),
    geometry: geometrySchema,
    properties: propertiesSchema,
    bbox: bboxSchema.optional(),
  });

export const featureCollectionSchema = <G extends Geometry | null, P = GeoJsonProperties>(
  featuresSchema: ZodType<Feature<G, P>>
): ZodType<FeatureCollection<G, P>> =>
  z.object({
    type: z.literal('FeatureCollection'),
    features: z.array(featuresSchema),
    bbox: bboxSchema.optional(),
  });
