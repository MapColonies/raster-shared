import type { ZodError, ZodIssue } from 'zod';

const formatPath = (path: (string | number)[]): string =>
  path.reduce<string>((acc, segment) => (typeof segment === 'number' ? `${acc}[${segment}]` : acc ? `${acc}.${segment}` : segment), '');

export const formatZodIssue = (issue: ZodIssue): string => {
  const path = formatPath(issue.path);
  return path ? `${path}: ${issue.message}` : issue.message;
};

export const formatZodError = (error: ZodError): string => error.issues.map(formatZodIssue).join('; ');
