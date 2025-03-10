import { RasterProductTypes } from '../constants';
import { polygonPartsEntityPatternSchema } from '../schemas';
import { PolygonPartsEntityName } from '../types';

export function generateEntityName(productId: string, productType: RasterProductTypes): PolygonPartsEntityName {
  const entityName = [productId, productType].join('_').toLowerCase();
  return polygonPartsEntityPatternSchema.parse(entityName);
}
