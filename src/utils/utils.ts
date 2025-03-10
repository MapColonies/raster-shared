import { RasterProductTypes } from '../constants';
import { PolygonPartsEntityName } from '../types';

export function generateEntityName(productId: string, productType: RasterProductTypes): PolygonPartsEntityName {
  return [productId, productType].join('_').toLowerCase() as PolygonPartsEntityName;
}
