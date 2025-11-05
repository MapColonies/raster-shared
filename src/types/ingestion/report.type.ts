export interface PolygonPartValidationError {
  id: string;
  errors: string[];
}
export interface PolygonPartsValidationResponseBody {
  parts: PolygonPartValidationError[];
  smallGeometriesCount: number;
  smallHolesCount: number;
}
