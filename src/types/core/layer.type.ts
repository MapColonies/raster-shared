import type z from 'zod';
import { RasterProductTypes } from '../../constants';
import type { rasterLayerCatalogSchema } from '../../schemas/core/layer.schema';

/**
 * Represents a layer name composed of a resourceId (equivalent to productId) and RasterProductType, joined by a hyphen.
 *
 * @example
 * // Valid layer names:
 * const layer1: LayerName = "Product123_A-Orthophoto";
 * const layer2: LayerName = "MyResource_XY-RasterMap";
 *
 * // Invalid layer names:
 * // "123resource-Orthophoto"   - resourceId must start with a letter
 * // "a$resource-RasterMap"     - resourceId contains invalid character ($)
 * // "resource123"              - Missing RasterProductType
 * // "resource123_RasterMap"    - Wrong separator
 * // "-RasterMap"              - Missing resourceId
 * // "resource123-"            - Missing RasterProductType
 * // "resource123-DTM"         - Invalid RasterProductType (must be a raster type)
 *
 * @remarks
 * - The resourceId (equivalent to productId) requirements:
 *   - Must start with a letter
 *   - Can contain only letters, numbers and underscores
 *   - Maximum length of 38 characters
 *   - Pattern: ^[A-Za-z]{1}[A-Za-z0-9_]{0,37}$
 * - The RasterProductType must be one of these valid raster types:
 *   - Orthophoto
 *   - OrthophotoHistory
 *   - OrthophotoBest
 *   - RasterMap
 *   - RasterMapBest
 *   - RasterAid
 *   - RasterAidBest
 *   - RasterVector
 *   - RasterVectorBest
 * - The hyphen (-) is used as the mandatory separator
 * - The type enforces the pattern: `${resourceId}-${RasterProductTypes}`
 */
export type LayerName = `${string}-${RasterProductTypes}`;

/**
 * Represents the naming pattern for polygon part entities, combining a snake_case identifier
 * with a lowercase raster product type.
 *
 * @example
 * ```typescript
 * // Valid examples:
 * const valid1: PolygonPartsEntityName = 'building_footprint_orthophoto';
 * const valid2: PolygonPartsEntityName = 'water_body_raster_map';
 * const valid3: PolygonPartsEntityName = 'road_segment_raster_vector_best';
 * const valid4: PolygonPartsEntityName = 'geological_feature_orthophoto_history';
 *
 * // Invalid examples (will cause type errors):
 * const invalid1: PolygonPartsEntityName = 'buildingFootprint_orthophoto'; // CamelCase not allowed
 * const invalid2: PolygonPartsEntityName = 'building_footprint_unknown'; // Invalid product type
 * const invalid3: PolygonPartsEntityName = 'BUILDING_orthophoto'; // Uppercase not allowed
 *  ```
 *
 * @remarks
 * - The type consists of two parts joined by an underscore:
 * 1. First part: A snake_case string (lowercase words separated by underscores)
 * 2. Second part: One of the predefined RasterProductTypes in lowercase
 *
 * The type ensures:
 * - String follows the required pattern
 * - Raster product type is valid
 * - All characters are properly lowercase
 * - Parts are properly joined with an underscore
 */
export type PolygonPartsEntityName = `${Lowercase<string>}_${Lowercase<RasterProductTypes>}`;

export interface LayerNameFormats {
  polygonPartsEntityName: PolygonPartsEntityName;
  layerName: LayerName;
}

export type RasterLayerCatalog = z.infer<typeof rasterLayerCatalogSchema>;
