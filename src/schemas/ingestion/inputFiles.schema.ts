import { z } from 'zod';
import { INGESTION_VALIDATIONS } from '../../constants/ingestion/constants';

export const gpkgFileNameSchema = z
  .string()
  .regex(new RegExp(INGESTION_VALIDATIONS.fileNames.pattern), 'File name must end with .gpkg')
  .describe('gpkgFileNameSchema');

export const shapefilePathSchema = z
  .string()
  .regex(new RegExp(INGESTION_VALIDATIONS.shapefileFilePath.pattern), 'File path must be a valid shapefile path ending with .shp');

export const filesSchema = z
  .object({
    gpkgFiles: z
      .array(gpkgFileNameSchema, {
        message: 'Files should be an array of .gpkg file names',
      })
      .length(1, { message: 'Number of files should be 1' }),
    shapeFilePath: shapefilePathSchema,
  })
  .describe('filesSchema');

export const inputFilesSchema = z
  .object({
    originDirectory: z.string().min(1, { message: 'Origin directory is required, files should be stored on specific directory' }),
    files: filesSchema,
  })
  .describe('inputFilesSchema');
