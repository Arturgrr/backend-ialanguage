export type Messages = {
  role: "user" | "system" | "assistant";
  content: string | Content[];
};

type Content = {
  type: "text";
  text: string;
};
