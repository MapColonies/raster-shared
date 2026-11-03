import { layerSchema, revisionObjectSchema } from '../core/layer.schema';

export const baseRasterLayerMetadataSchema = revisionObjectSchema
  .pick({
    classification: true,
    keywords: true,
  })
  .describe('baseRasterLayerMetadataSchema');

export const newRasterLayerMetadataSchema = baseRasterLayerMetadataSchema
  .merge(layerSchema.pick({ productId: true, productType: true }))
  .merge(
    revisionObjectSchema.pick({
      description: true,
      producerName: true,
      productName: true,
      productSubType: true,
      region: true,
      scale: true,
      srs: true,
      srsName: true,
      transparency: true,
    })
  )
  .describe('newRasterLayerMetadataSchema');

export const updateRasterLayerMetadataSchema = baseRasterLayerMetadataSchema.describe('updateRasterLayerMetadataSchema');
