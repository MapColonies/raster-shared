import z from 'zod';
import { deleteTaskParamsSchema, layerTilesDeletionParamsSchema, artifactsDeletionParamsSchema } from '../../schemas/deletion/task.schema';

export type DeleteTaskParams = z.infer<typeof deleteTaskParamsSchema>;
export type LayerTilesDeletionParams = z.infer<typeof layerTilesDeletionParamsSchema>;
export type ArtifactsDeletionParams = z.infer<typeof artifactsDeletionParamsSchema>;
