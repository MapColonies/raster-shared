import { BBox, MultiPolygon, Polygon } from 'geojson';
import { z, ZodType } from 'zod';

export const bboxSchema: ZodType<BBox> = z.union([
  z.tuple([z.number(), z.number(), z.number(), z.number()]),
  z.tuple([z.number(), z.number(), z.number(), z.number(), z.number(), z.number()]),
]);

export const polygonSchema: ZodType<Polygon> = z.object({
  type: z.literal('Polygon'),
  coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))),
  bbox: bboxSchema.optional(),
});

export const multiPolygonSchema: ZodType<MultiPolygon> = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(z.array(z.array(z.tuple([z.number(), z.number()])))),
  bbox: bboxSchema.optional(),
});
