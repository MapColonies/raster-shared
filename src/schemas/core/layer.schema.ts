import z from 'zod';
import { INGESTION_VALIDATIONS, RasterProductTypes } from '../../constants';

export const layerNameSchema = z.object({
  resourceId: z.string().regex(new RegExp(INGESTION_VALIDATIONS.productId.pattern)),
  productType: z.nativeEnum(RasterProductTypes),
});
