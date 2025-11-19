import z from 'zod';

export const counterSchema = z.number().min(0).describe('A non-negative integer counter');

export const thresholdCheckSchema = z.object({
  exceeded: z.boolean().describe('Indicates if the threshold has been exceeded'),
  count: counterSchema,
});

export const featuresErrorCountSchema = z.object({
  geometryValidity: counterSchema.describe('Number of features with invalid geometry'),
  vertices: counterSchema.describe('Number of features exceeding the maximum allowed vertices'),
  metadata: counterSchema.describe('Number of features with invalid or missing metadata'),
  resolution: counterSchema.describe('Number of features not matching the required resolution'),
});

export const validationAggregatedErrorsSchema = z.object({
  errorsCount: featuresErrorCountSchema.describe('Aggregated count of validation errors'),
  smallHoles: thresholdCheckSchema.describe('Small holes threshold check result'),
  smallGeometries: thresholdCheckSchema.describe('Small geometries threshold check result'),
});
