import z from 'zod';
import { cacheDeletionJobParamsSchema, deleteLayerJobParamsSchema } from '../../schemas/deletion/job.schema';

export type DeleteLayerJobParams = z.infer<typeof deleteLayerJobParamsSchema>;

export type CacheDeletionJobParams = z.infer<typeof cacheDeletionJobParamsSchema>;
