import { openai } from "@/openai";
import { Messages } from "@/openai/models/message";

export const noAccountInteraction = async (mensagens: Messages[]) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `Você é uma ia que dá aula de inglês, e você recebeu uma mensagem de um aluno, porém esse aluno ainda não está cadastrado, você deve instruir para o mesmo se cadastrar antes de continuar`,
      },
      ...mensagens,
    ],
  });

  return response;
};
