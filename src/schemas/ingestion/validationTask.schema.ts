import z from 'zod';

export const counterSchema = z.number().min(0).describe('A non-negative integer counter');

export const thresholdCheckSchema = z.object({
  exceeded: z.boolean().describe('Indicates if the threshold has been exceeded'),
});

export const featuresErrorCountSchema = z.object({
  geometryValidity: counterSchema.describe('Number of features with invalid geometry'),
  vertices: counterSchema.describe('Number of features exceeding the maximum allowed vertices'),
  metadata: counterSchema.describe('Number of features with invalid or missing metadata'),
  resolution: counterSchema.describe('Number of features not matching the required resolution'),
  smallHoles: counterSchema.describe('Number of features containing small holes'),
  smallGeometries: counterSchema.describe('Number of features containing small geometries'),
  unknown: counterSchema.describe('Number of features with unknown errors'),
});

export const thresholdsSchema = z.object({
  smallHoles: thresholdCheckSchema.describe('Small holes threshold check result').extend({
    count: counterSchema,
  }),
  smallGeometries: thresholdCheckSchema.describe('Small geometries threshold check result'),
});

export const validationAggregatedErrorsSchema = z.object({
  errorsCount: featuresErrorCountSchema.describe('Aggregated count of validation errors'),
  thresholds: thresholdsSchema.describe('Threshold check results'),
});
