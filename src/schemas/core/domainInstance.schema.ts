import z from 'zod';
import { DomainInstanceType } from '../../constants';

export const domainInstanceTypeSchema = z.nativeEnum(DomainInstanceType);
