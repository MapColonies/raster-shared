export interface PolygonPartValidationError {
  id: string;
  errors: string[];
}
export interface PolygonPartsValidationResponseBody {
  parts: PolygonPartValidationError[];
  smallGeometriesCount: number; // count in this chunk
  smallHolesCount: number; // count in this chunk
}
