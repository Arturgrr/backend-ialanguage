import { env } from "@/env";
import { FastifyReply, FastifyRequest } from "fastify";

interface WebhookQuery {
  "hub.mode": string;
  "hub.challenge": string;
  "hub.verify_token": string;
}

export async function getWhatsappWebhook(
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> {
  const query = req.query as Partial<WebhookQuery>;

  if (
    !query["hub.mode"] ||
    !query["hub.challenge"] ||
    !query["hub.verify_token"]
  ) {
    rep.status(400).send({
      error:
        "Invalid request: Missing required parameters (hub.mode, hub.challenge, hub.verify_token).",
    });
    return;
  }

  const expectedVerifyToken = env.WHATSAPP_VERIFY_TOKEN;
  if (query["hub.verify_token"] === expectedVerifyToken) {
    rep.status(200).send(query["hub.challenge"]);
  } else {
    rep.status(403).send({ error: "Forbidden: Incorrect verify token" });
  }
}
