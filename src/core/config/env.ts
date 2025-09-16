import { z } from "zod";

export type Environments = typeof env;

const envSchema = z.object({
  api: z.string().regex(/^https?:\/\/[^\s$.?#].[^\s]*$/, {
    message: "Invalid API Gateway URL",
  }),
  mapboxAccessToken: z.string(),
});

export const env = envSchema.parse({
  api: import.meta.env.VITE_API,
  mapboxAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
});
