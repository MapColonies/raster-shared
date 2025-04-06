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

const firstAndLastPositionsEquality = (positions: Position[]): boolean => {
  const first = positions.at(0);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const last = positions.at(-1);
  return (
    !!first &&
    !!last &&
    first.at(0) === last.at(0) &&
    first.at(1) === last.at(1) &&
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    ((first.at(2) !== undefined && last.at(2) !== undefined) || first.at(2) === last.at(2))
  );
};

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const longitudeSchema = z.number().min(-180).max(180);
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const latitudeSchema = z.number().min(-90).max(90);
export const elevationSchema = z.number().safe();

export const positionSchema: ZodType<Position> = z.union([
  z.tuple([longitudeSchema, latitudeSchema]),
  z.tuple([longitudeSchema, latitudeSchema, elevationSchema]),
]);

export const bboxSchema: ZodType<BBox> = z.union([
  z.tuple([longitudeSchema, latitudeSchema, longitudeSchema, latitudeSchema]),
  z.tuple([longitudeSchema, latitudeSchema, elevationSchema, longitudeSchema, latitudeSchema, elevationSchema]),
]);

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
  coordinates: z.array(z.array(positionSchema).min(4).refine(firstAndLastPositionsEquality)).min(1),
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
