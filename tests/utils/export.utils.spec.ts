import { EXPORT_COLUMN_NAME_OVERRIDES, convertKeysToExportColumns } from '../../src/utils/export.utils';

describe('export-name converter', () => {
  describe('convertKeysToExportColumns', () => {
    it('renames camelCase keys to snake_case export columns, applying overrides and preserving values', () => {
      const input = {
        id: 'abc', // single-word key is unchanged
        sensors: ['a', 'b'],
        sourceName: 'src', // plain camelCase -> snake_case
        horizontalAccuracyCE90: 3, // acronym + number kept together
        imagingTimeBeginUTC: '2020-01-01', // trailing acronym (UTC)
        ingestionDateUTC: '2021-02-03',
        resolutionDegree: 0.5, // override -> resolution_deg (not resolution_degree)
        resolutionMeter: 12, // not overridden
        maxResolutionDeg: 0.7, // already abbreviated, no override needed
      };

      // toEqual (not toStrictEqual): the result intentionally has a null prototype for safety.
      /* eslint-disable @typescript-eslint/naming-convention -- snake_case keys are the expected export column names */
      expect(convertKeysToExportColumns(input)).toEqual({
        id: 'abc',
        sensors: ['a', 'b'],
        source_name: 'src',
        horizontal_accuracy_ce90: 3,
        imaging_time_begin_utc: '2020-01-01',
        ingestion_date_utc: '2021-02-03',
        resolution_deg: 0.5,
        resolution_meter: 12,
        max_resolution_deg: 0.7,
      });
      /* eslint-enable @typescript-eslint/naming-convention */
    });

    it('preserves null values (used for fixed-schema columns)', () => {
      expect(convertKeysToExportColumns({ description: null, cities: null })).toEqual({ description: null, cities: null });
    });

    it('returns an object with no prototype to avoid prototype-chain writes', () => {
      expect(Object.getPrototypeOf(convertKeysToExportColumns({ sourceName: 'x' }))).toBeNull();
    });
  });

  describe('override table', () => {
    it('declares resolutionDegree -> resolution_deg as its single entry', () => {
      expect(EXPORT_COLUMN_NAME_OVERRIDES).toStrictEqual({ resolutionDegree: 'resolution_deg' });
    });
  });
});
