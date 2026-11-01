import { RasterProductTypes } from '../constants';
import { polygonPartsEntityPatternSchema } from '../schemas';
import { resourceIdSchema } from '../schemas/core/layer.schema';
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
