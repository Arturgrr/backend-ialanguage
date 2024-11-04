import { env } from "@/env";
import axios from "axios";
import { MediaSchema } from "./models/media";

type AnyObject = { [key: string]: any };

const messagesApi = async (object: AnyObject) => {
  const response = await axios.post(
    `https://graph.facebook.com/${env.WHATSAPP_API_VERSION}/${env.WHATSAPP_PHONE_ID}/messages`,
    object,
    {
      headers: {
        Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const sendTextMessage = async (phoneNumber: String, content: String) => {
  return await messagesApi({
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "text",
    text: {
      body: content,
    },
  });
};

export const sendReplyTextMessage = async (
  phoneNumber: String,
  content: String,
  replyMessage: String
) => {
  return await messagesApi({
    messaging_product: "whatsapp",
    to: phoneNumber,
    recipient_type: "individual",
    context: {
      message_id: replyMessage,
    },
    type: "text",
    text: {
      body: content,
    },
  });
};

export const downloadMedia = async (mediaId: String) => {
  const mediaResponse = await axios.get(
    `https://graph.facebook.com/${env.WHATSAPP_API_VERSION}/${mediaId}`,
    {
      headers: {
        Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
      },
    }
  );

  const _env = MediaSchema.safeParse(mediaResponse.data);
  if (!_env.success) {
    throw new Error("Invalid media response");
  }
  const mediaData = _env.data;

  return mediaData;
};
