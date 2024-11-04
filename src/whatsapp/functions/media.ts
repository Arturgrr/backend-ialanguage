import { env } from "@/env";
import axios from "axios";
import { MediaSchema } from "../models/media";
import { z } from "zod";

export const getMedia = async (mediaId: String) => {
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

type Media = z.infer<typeof MediaSchema>;

export const getMediaBuffer = async (mediaData: Media) => {
  const response = await axios.get(mediaData.url, {
    headers: {
      Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": mediaData.mime_type,
    },
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
};
