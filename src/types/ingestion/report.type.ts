export interface PolygonPartValidationError {
  id: string;
  errors: string[];
}
export interface PolygonPartsChunkValidationResult {
  parts: PolygonPartValidationError[];
  smallGeometriesCount: number;
  smallHolesCount: number;
}
