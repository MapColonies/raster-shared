import z, { ZodType } from 'zod';
import { INGESTION_VALIDATIONS, RASTER_PRODUCT_TYPE_LIST } from '../../constants';
import { PolygonPartsEntityName } from '../../types';
import { rasterProductTypeSchema, resourceIdSchema } from '../core';

export const polygonPartsEntityPatternSchema = z
  .string()
  .regex(new RegExp(INGESTION_VALIDATIONS.polygonPartsEntityName.pattern), { message: 'Polygon parts entity name should valid entity name' })
  .refine(
    (value) => {
      return RASTER_PRODUCT_TYPE_LIST.some((type) => value.endsWith(type.toLowerCase()));
    },
    { message: 'Polygon parts entity name should end with one of the valid raster product types' }
  )
  .describe('polygonPartsEntityPatternSchema') as ZodType<PolygonPartsEntityName>;

export const layerNamePatternSchema = z.string().refine(
  (value) => {
    const [resourceId, rasterProductType] = value.split('-');

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!resourceId || !rasterProductType) {
      return false;
    }

    const resourceIdResult = resourceIdSchema.safeParse(resourceId);
    if (!resourceIdResult.success) {
      return false;
    }

    const productTypeResult = rasterProductTypeSchema.safeParse(rasterProductType);
    if (!productTypeResult.success) {
      return false;
    }

    return true;
  },
  { message: 'Layer name should be in the format of {resourceId}-{rasterProductType}' }
);
