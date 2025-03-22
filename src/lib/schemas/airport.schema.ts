import { z } from 'zod';

export const AirportSchema = z.object({
  code: z.string().min(3).max(3),
  lon: z.string().optional(), 
  lat: z.string().optional(),
  iso: z.string().optional(),
  status: z.number().optional(),
  name: z.string().nullable(),
  continent: z.string().optional(),
  type: z.string().optional(),
  size: z.string().nullable().optional(),
  country: z.string()
});

export const AirportArraySchema = z.array(AirportSchema);
export type Airport = z.infer<typeof AirportSchema>;
