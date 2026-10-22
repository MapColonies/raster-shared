import z from 'zod';
import { ValidationErrorType } from '../../constants';
import { validationReportSchema } from '../../schemas';

export type PolygonPartValidationErrorsType = Pick<
  typeof ValidationErrorType,
  'RESOLUTION' | 'GEOMETRY_VALIDITY' | 'SMALL_GEOMETRY' | 'SMALL_HOLES' | 'UNKNOWN'
>[keyof Pick<typeof ValidationErrorType, 'GEOMETRY_VALIDITY' | 'RESOLUTION' | 'SMALL_GEOMETRY' | 'SMALL_HOLES' | 'UNKNOWN'>];

export interface PolygonPartValidationResolutionErrorItem {
  code: (typeof ValidationErrorType)['RESOLUTION'];
  isExceeded: boolean;
}

export interface PolygonPartValidationGeneralErrorItem {
  code: Exclude<PolygonPartValidationErrorsType, (typeof ValidationErrorType)['RESOLUTION']>;
}

export type PolygonPartValidationErrorItem = PolygonPartValidationResolutionErrorItem | PolygonPartValidationGeneralErrorItem;

export interface PolygonPartValidationError {
  id: string;
  errors: PolygonPartValidationErrorItem[];
}
export interface PolygonPartsChunkValidationResult {
  parts: PolygonPartValidationError[];
  smallHolesCount: number;
}

export type ValidationReport = z.infer<typeof validationReportSchema>;
