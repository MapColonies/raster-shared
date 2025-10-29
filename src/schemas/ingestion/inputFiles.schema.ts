import { z } from 'zod';
import { INGESTION_VALIDATIONS } from '../../constants/ingestion/constants';

export const gpkgFileNameSchema = z
  .string()
  .regex(new RegExp(INGESTION_VALIDATIONS.gpkgfileName.pattern), { message: 'File name must end with .gpkg' })
  .describe('gpkgFileNameSchema');

export const metadataShapefilePathSchema = z
  .string()
  .regex(new RegExp(INGESTION_VALIDATIONS.metadataShapefilePath.pattern), {
    message: 'Metadata shape file path must be a valid shapefile path ending with "/ShapeMetadata.shp"',
  })
  .describe('metadataShapefileSchema');

export const productShapefilePathSchema = z
  .string()
  .regex(new RegExp(INGESTION_VALIDATIONS.productShapefilePath.pattern), {
    message: 'Product file path must be a valid shapefile path ending with "/Product.shp"',
  })
  .describe('productShapefilePathSchema');

export const inputFilesSchema = z
  .object({
    gpkgFilesPath: z
      .array(gpkgFileNameSchema, {
        message: 'Files should be an array of .gpkg file names',
      })
      .length(1, { message: 'Number of files should be 1' }),
    metadataShapefilePath: metadataShapefilePathSchema,
    productShapefilePath: productShapefilePathSchema,
  })
  .describe('inputFilesSchema');
