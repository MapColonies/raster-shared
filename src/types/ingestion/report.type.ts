import { ValidationErrorType } from '../../constants';

export type PolygonPartValidationErrorsType = Pick<
  typeof ValidationErrorType,
  'RESOLUTION' | 'GEOMETRY_VALIDITY' | 'SMALL_GEOMETRY' | 'SMALL_HOLES' | 'UNKNOWN'
>[keyof Pick<typeof ValidationErrorType, 'GEOMETRY_VALIDITY' | 'RESOLUTION' | 'SMALL_GEOMETRY' | 'SMALL_HOLES' | 'UNKNOWN'>];

export interface PolygonPartValidationError {
  id: string;
  errors: PolygonPartValidationErrorsType[];
}
export interface PolygonPartsChunkValidationResult {
  parts: PolygonPartValidationError[];
  smallHolesCount: number;
}
