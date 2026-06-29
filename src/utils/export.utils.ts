import { snakeCase } from 'change-case';

/**
 * Canonical naming exceptions for export (GeoPackage) column names.
 *
 * The general rule is `change-case`'s {@link snakeCase}. Entries here override that rule for fields
 * whose required export column name differs from the plain snake_case form. This object is the single
 * place such exceptions are declared.
 *
 * Current entries:
 * - `resolutionDegree -> resolution_deg`: the per-part resolution field. `snakeCase` yields
 *   `resolution_degree`, but the product spec requires the abbreviated `resolution_deg`
 *   (matching the already-abbreviated aggregate fields `maxResolutionDeg`/`minResolutionDeg`).
 */
export const EXPORT_COLUMN_NAME_OVERRIDES: Record<string, string> = {
  resolutionDegree: 'resolution_deg',
};

/**
 * Maps a single camelCase property name to its export (GeoPackage) column name.
 *
 * Consults {@link EXPORT_COLUMN_NAME_OVERRIDES} first, then falls back to `change-case`'s snake_case.
 * This is the canonical export-column naming and is NOT a generic snake_case utility — it carries
 * the override table above.
 */
export const toExportColumnName = (propertyName: string): string => {
  return EXPORT_COLUMN_NAME_OVERRIDES[propertyName] ?? snakeCase(propertyName);
};

/**
 * Returns a new object whose keys are converted to their export column names via {@link toExportColumnName}.
 * Values (including `null`, used for fixed-schema columns) are preserved as-is.
 */
export const convertKeysToExportColumns = (obj: Record<string, unknown>): Record<string, unknown> => {
  // Null-prototype accumulator so a converted key such as `__proto__` becomes a plain own property
  // rather than mutating the prototype chain (this helper is exported for reuse with arbitrary keys).
  const result = Object.create(null) as Record<string, unknown>;
  for (const [key, value] of Object.entries(obj)) {
    result[toExportColumnName(key)] = value;
  }
  return result;
};
