/* eslint-disable @typescript-eslint/naming-convention -- assertions intentionally use snake_case export column names */
import { EXPORT_COLUMN_NAME_OVERRIDES, convertKeysToExportColumns, toExportColumnName } from '../../src/utils/export.utils';

describe('export-name converter', () => {
  describe('toExportColumnName', () => {
    it('converts a plain camelCase key to snake_case', () => {
      expect(toExportColumnName('sourceName')).toBe('source_name');
    });

    it('keeps acronym/number tokens together (CE90, UTC)', () => {
      expect(toExportColumnName('horizontalAccuracyCE90')).toBe('horizontal_accuracy_ce90');
      expect(toExportColumnName('imagingTimeBeginUTC')).toBe('imaging_time_begin_utc');
      expect(toExportColumnName('imagingTimeEndUTC')).toBe('imaging_time_end_utc');
      expect(toExportColumnName('ingestionDateUTC')).toBe('ingestion_date_utc');
    });

    it('leaves single-word keys unchanged', () => {
      expect(toExportColumnName('sensors')).toBe('sensors');
      expect(toExportColumnName('id')).toBe('id');
    });

    it('applies the override table before the general rule', () => {
      // resolutionDegree would snake_case to resolution_degree, but the product spec wants resolution_deg
      expect(toExportColumnName('resolutionDegree')).toBe('resolution_deg');
    });

    it('does not override fields that already abbreviate correctly', () => {
      expect(toExportColumnName('resolutionMeter')).toBe('resolution_meter');
      expect(toExportColumnName('maxResolutionDeg')).toBe('max_resolution_deg');
      expect(toExportColumnName('minResolutionDeg')).toBe('min_resolution_deg');
    });
  });

  describe('override table', () => {
    it('declares resolutionDegree -> resolution_deg as its single entry', () => {
      expect(EXPORT_COLUMN_NAME_OVERRIDES).toStrictEqual({ resolutionDegree: 'resolution_deg' });
    });
  });

  describe('convertKeysToExportColumns', () => {
    it('renames every key of an object, preserving values', () => {
      const input = {
        id: 'abc',
        sourceName: 'src',
        horizontalAccuracyCE90: 3,
        imagingTimeBeginUTC: '2020-01-01',
        resolutionDegree: 0.5,
        sensors: ['a', 'b'],
      };

      // toEqual (not toStrictEqual): the result intentionally has a null prototype for safety.
      expect(convertKeysToExportColumns(input)).toEqual({
        id: 'abc',
        source_name: 'src',
        horizontal_accuracy_ce90: 3,
        imaging_time_begin_utc: '2020-01-01',
        resolution_deg: 0.5,
        sensors: ['a', 'b'],
      });
    });

    it('preserves null values (used for fixed-schema columns)', () => {
      expect(convertKeysToExportColumns({ description: null, cities: null })).toEqual({
        description: null,
        cities: null,
      });
    });

    it('returns an object with no prototype to avoid prototype-chain writes', () => {
      expect(Object.getPrototypeOf(convertKeysToExportColumns({ sourceName: 'x' }))).toBeNull();
    });
  });
});
