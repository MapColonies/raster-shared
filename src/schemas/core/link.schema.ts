import z from 'zod';
import { CORE_VALIDATIONS } from '../../constants';

export const urlSchema = z.string().regex(new RegExp(CORE_VALIDATIONS.url.pattern));

export const urlsArraySchema = z.array(urlSchema);
