import { ValidationErrorType } from '../../constants';

export type PolygonPartValidationErrorsType = Pick<
  typeof ValidationErrorType,
  'RESOLUTION' | 'GEOMETRY_VALIDITY' | 'SMALL_GEOMETRY' | 'SMALL_HOLES'
>[keyof Pick<typeof ValidationErrorType, 'GEOMETRY_VALIDITY' | 'RESOLUTION' | 'SMALL_GEOMETRY' | 'SMALL_HOLES'>];

export interface PolygonPartValidationError {
  id: string;
  errors: PolygonPartValidationErrorsType[];
}
export interface PolygonPartsChunkValidationResult {
  parts: PolygonPartValidationError[];
  smallGeometriesCount: number;
  smallHolesCount: number;
}
