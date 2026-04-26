import z from 'zod';
import { ValidationErrorType } from '../../constants';
import { validationReportSchema } from '../../schemas';

export type PolygonPartValidationErrorsType = Pick<
  typeof ValidationErrorType,
  'RESOLUTION' | 'GEOMETRY_VALIDITY' | 'SMALL_GEOMETRY' | 'SMALL_HOLES' | 'UNKNOWN'
>[keyof Pick<typeof ValidationErrorType, 'GEOMETRY_VALIDITY' | 'RESOLUTION' | 'SMALL_GEOMETRY' | 'SMALL_HOLES' | 'UNKNOWN'>];

export type PolygonPartValidationErrorItem =
  | {
      code: (typeof ValidationErrorType)['RESOLUTION'];
      isExceeded: boolean;
    }
  | {
      code: Exclude<PolygonPartValidationErrorsType, (typeof ValidationErrorType)['RESOLUTION']>;
    };

export interface PolygonPartValidationError {
  id: string;
  errors: PolygonPartValidationErrorItem[];
}
export interface PolygonPartsChunkValidationResult {
  parts: PolygonPartValidationError[];
  smallHolesCount: number;
}

export type ValidationReport = z.infer<typeof validationReportSchema>;
