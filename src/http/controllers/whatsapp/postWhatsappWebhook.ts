import { MessageSchema } from "@/whatsapp/models/messages";
import { FastifyReply, FastifyRequest } from "fastify";

export async function postWhatsappWebhook(
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> {
  const _env = MessageSchema.safeParse(req.body);
  if (!_env.success) {
    console.error(JSON.stringify(_env.error.format().entry, null, 2));
    rep.status(400).send(_env.error);
    return;
  }
  rep.status(200).send({ message: "Webhook received successfully" });
  const body = _env.data;

  for (const entry of body.entry) {
    for (const changes of entry.changes) {
      const messageEntry = changes.value;

      if (!("messages" in messageEntry) || !messageEntry.messages?.length)
        return;
    }
  }
}
