import z from 'zod';
import { polygonPartsFeatureCollectionSchema, polygonPartsPayloadSchema } from '../../schemas';

export type PolygonPartsFeatureCollection = z.infer<typeof polygonPartsFeatureCollectionSchema>;
export type PolygonPartsPayload = z.infer<typeof polygonPartsPayloadSchema>;
