import { speechToText } from "@/openai/functions/speechToText";
import { getMedia, getMediaBuffer } from "@/whatsapp/functions/media";
import { MessageSchema } from "@/whatsapp/models/messages";
import { toFile } from "openai";
import { z } from "zod";

type MessageEntry = z.infer<typeof MessageSchema>["entry"][number];
type ChangeEntry = MessageEntry["changes"][number];
type MessageType = NonNullable<ChangeEntry["value"]["messages"]>[number];

export const getTextContent = async (message: MessageType) => {
  if ("audio" in message) {
    const mediaInfo = await getMedia(message.audio.id);
    const mediaBuffer = await getMediaBuffer(mediaInfo);
    const file = await toFile(mediaBuffer, "audio");
    return await speechToText(file);
  } else if ("text" in message) {
    return message.text;
  } else {
    return null;
  }
};
