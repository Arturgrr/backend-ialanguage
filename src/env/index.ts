import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  OPENAI_API_KEY: z.string(),
  WHATSAPP_ACCESS_TOKEN: z.string(),
  WHATSAPP_VERIFY_TOKEN: z.string(),
  WHATSAPP_PHONE_ID: z.string(),
  WHATSAPP_API_VERSION: z.string(),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
