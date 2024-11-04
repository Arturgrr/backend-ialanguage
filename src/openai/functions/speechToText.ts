import { FileLike } from "openai/uploads";
import { openai } from "..";

export const speechToText = async (file: FileLike) => {
  const transcript = await openai.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
    response_format: "text",
  });

  return transcript;
};
