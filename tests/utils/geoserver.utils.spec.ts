import {
  GeoserverFeatureTypesList,
  POLYGON_PARTS_FEATURE_TYPE_ATTRIBUTES,
  POLYGON_PARTS_FEATURE_TYPE_DEFAULTS,
} from '../../src/constants/core/geoserver.constants';
import { buildPolygonPartsFeatureTypeBody, parseFeatureTypeNames } from '../../src/utils/geoserver.utils';

describe('geoserver utils', () => {
  describe('buildPolygonPartsFeatureTypeBody', () => {
    it('should build the same create feature type body geoserver-api sends to GeoServer', () => {
      const body = buildPolygonPartsFeatureTypeBody({ nativeName: 'abc_orthophoto', name: 'abc-Orthophoto' });

      const expectedBoundingBox = { minx: -180, maxx: 180, miny: -90, maxy: 90, crs: 'EPSG:4326' };
      expect(body).toEqual({
        featureType: {
          name: 'abc-Orthophoto',
          nativeName: 'abc_orthophoto',
          srs: 'EPSG:4326',
          nativeBoundingBox: expectedBoundingBox,
          latLonBoundingBox: expectedBoundingBox,
          numDecimals: 100,
          attributes: { attribute: POLYGON_PARTS_FEATURE_TYPE_ATTRIBUTES },
        },
      });
    });

    it('should default the layer name to the native name when name is not provided', () => {
      const body = buildPolygonPartsFeatureTypeBody({ nativeName: 'abc_orthophoto' });

      expect(body.featureType.name).toBe('abc_orthophoto');
    });

    it('should apply srs and numDecimals overrides, including the bounding box crs', () => {
      const body = buildPolygonPartsFeatureTypeBody({ nativeName: 'abc_orthophoto', srs: 'EPSG:3857', numDecimals: 8 });

      expect(body.featureType.srs).toBe('EPSG:3857');
      expect(body.featureType.numDecimals).toBe(8);
      expect(body.featureType.nativeBoundingBox.crs).toBe('EPSG:3857');
      expect(body.featureType.latLonBoundingBox.crs).toBe('EPSG:3857');
    });

    it('should not share attribute objects with the exported constant', () => {
      const body = buildPolygonPartsFeatureTypeBody({ nativeName: 'abc_orthophoto' });

      body.featureType.attributes.attribute.forEach((attribute) => {
        attribute.name = 'mutated';
      });

      expect(POLYGON_PARTS_FEATURE_TYPE_ATTRIBUTES.map(({ name }) => name)).not.toContain('mutated');
    });
  });

  describe('POLYGON_PARTS_FEATURE_TYPE_ATTRIBUTES', () => {
    it('should expose the 19 polygon parts attributes with their snake_case source columns', () => {
      const mapping = POLYGON_PARTS_FEATURE_TYPE_ATTRIBUTES.map(({ name, source }) => [name, source]);

      expect(mapping).toEqual([
        ['id', undefined],
        ['catalogId', 'catalog_id'],
        ['productId', 'product_id'],
        ['productType', 'product_type'],
        ['sourceId', 'source_id'],
        ['sourceName', 'source_name'],
        ['productVersion', 'product_version'],
        ['ingestionDateUTC', 'ingestion_date_utc'],
        ['imagingTimeBeginUTC', 'imaging_time_begin_utc'],
        ['imagingTimeEndUTC', 'imaging_time_end_utc'],
        ['resolutionDegree', 'resolution_degree'],
        ['resolutionMeter', 'resolution_meter'],
        ['sourceResolutionMeter', 'source_resolution_meter'],
        ['horizontalAccuracyCe90', 'horizontal_accuracy_ce90'],
        ['sensors', 'sensors'],
        ['countries', 'countries'],
        ['cities', 'cities'],
        ['description', 'description'],
        ['footprint', 'footprint'],
      ]);
    });

    it('should keep the defaults geoserver-api is deployed with', () => {
      expect(POLYGON_PARTS_FEATURE_TYPE_DEFAULTS).toEqual({ srs: 'EPSG:4326', numDecimals: 100 });
    });
  });

  describe('parseFeatureTypeNames', () => {
    it('should return the names of configured feature types', () => {
      const response = {
        featureTypes: {
          featureType: [
            { name: 'abc-Orthophoto', href: 'http://geoserver/rest/abc-Orthophoto.json' },
            { name: 'def-OrthophotoHistory', href: 'http://geoserver/rest/def-OrthophotoHistory.json' },
          ],
        },
      };

      expect(parseFeatureTypeNames(response, GeoserverFeatureTypesList.CONFIGURED)).toEqual(['abc-Orthophoto', 'def-OrthophotoHistory']);
    });

    it.each([GeoserverFeatureTypesList.ALL, GeoserverFeatureTypesList.AVAILABLE, GeoserverFeatureTypesList.AVAILABLE_WITH_GEOM])(
      'should return the table names for list=%s',
      (listType) => {
        const response = { list: { string: ['abc_orthophoto', 'abc_orthophoto_parts'] } };

        expect(parseFeatureTypeNames(response, listType)).toEqual(['abc_orthophoto', 'abc_orthophoto_parts']);
      }
    );

    it('should return an empty list when GeoServer returns an empty configured list', () => {
      expect(parseFeatureTypeNames({ featureTypes: '' }, GeoserverFeatureTypesList.CONFIGURED)).toEqual([]);
      expect(parseFeatureTypeNames({ featureTypes: {} }, GeoserverFeatureTypesList.CONFIGURED)).toEqual([]);
    });

    it('should return an empty list when GeoServer returns an empty table list', () => {
      expect(parseFeatureTypeNames({ list: '' }, GeoserverFeatureTypesList.ALL)).toEqual([]);
      expect(parseFeatureTypeNames({ list: {} }, GeoserverFeatureTypesList.ALL)).toEqual([]);
    });

    it('should handle a single item returned as an object instead of an array', () => {
      expect(
        parseFeatureTypeNames({ featureTypes: { featureType: { name: 'abc-Orthophoto', href: 'x' } } }, GeoserverFeatureTypesList.CONFIGURED)
      ).toEqual(['abc-Orthophoto']);
      expect(parseFeatureTypeNames({ list: { string: 'abc_orthophoto' } }, GeoserverFeatureTypesList.ALL)).toEqual(['abc_orthophoto']);
    });
  });
});
