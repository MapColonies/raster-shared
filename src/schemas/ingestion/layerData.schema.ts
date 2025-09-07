import z from 'zod';
import { inputFilesSchema } from './inputFiles.schema';

export const layerDataSchema = z.object({
  inputFiles: inputFilesSchema,
});
