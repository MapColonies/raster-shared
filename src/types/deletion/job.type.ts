import z from 'zod';
import { deleteLayerJobParamsSchema } from '../../schemas/deletion/job.schema';

export type DeleteLayerJobParams = z.infer<typeof deleteLayerJobParamsSchema>;
