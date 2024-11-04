import { FastifyInstance } from "fastify";
import { getWhatsappWebhook } from "./controllers/whatsapp/getWhatsappWebhook";
import { postWhatsappWebhook } from "./controllers/whatsapp/postWhatsappWebhook";

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post("/whatsapp/webhook", postWhatsappWebhook);
  app.get("/whatsapp/webhook", getWhatsappWebhook);
}
