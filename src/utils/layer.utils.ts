import { RasterProductTypes } from '../constants';
import { polygonPartsEntityPatternSchema } from '../schemas';
import type { PolygonPartsEntityName, LayerName } from '../types';

export function generateEntityName(productId: string, productType: RasterProductTypes): PolygonPartsEntityName {
  const entityName = [productId, productType].join('_').toLowerCase();
  return polygonPartsEntityPatternSchema.parse(entityName);
}

export function getMapServingLayerName(productId: string, productType: RasterProductTypes): LayerName {
  const layerName = `${productId}-${productType}` satisfies LayerName;
  return layerName;
}
