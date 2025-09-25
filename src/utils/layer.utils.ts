import { RasterProductTypes } from '../constants';
import { polygonPartsEntityPatternSchema, resourceIdSchema } from '../schemas';
import type { LayerName, PolygonPartsEntityName } from '../types';

export function getEntityName(productId: string, productType: RasterProductTypes): PolygonPartsEntityName {
  resourceIdSchema.parse(productId);
  const entityName = [productId, productType].join('_').toLowerCase();
  return polygonPartsEntityPatternSchema.parse(entityName);
}

export function getMapServingLayerName(productId: string, productType: RasterProductTypes): LayerName {
  resourceIdSchema.parse(productId);
  const layerName = `${productId}-${productType}` satisfies LayerName;
  return layerName;
}
