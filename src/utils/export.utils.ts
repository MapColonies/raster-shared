import { snakeCase } from 'change-case';

/** Export column names that differ from plain `snakeCase` (e.g. `resolution_degree` -> `resolution_deg`). */
export const GPKG_COLUMN_NAME_OVERRIDES: Record<string, string> = {
  resolutionDegree: 'resolution_deg',
};

/** Maps a camelCase property to its GeoPackage export column name: an override if present, else `snakeCase`. */
export const toGpkgColumnName = (propertyName: string): string => {
  return GPKG_COLUMN_NAME_OVERRIDES[propertyName] ?? snakeCase(propertyName);
};

/** Renames an object's keys to their export column names, preserving values (incl. `null`). */
export const convertKeysToGpkgColumns = (obj: Record<string, unknown>): Record<string, unknown> => {
  const result = Object.create(null) as Record<string, unknown>; // null-proto: a `__proto__` key stays a plain own property
  for (const [key, value] of Object.entries(obj)) {
    result[toGpkgColumnName(key)] = value;
  }
  return result;
};
