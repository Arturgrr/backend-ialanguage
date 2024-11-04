import { env } from "./env";
import { app } from "./http/server";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("🚀 Server is running on http://localhost:3333");
  });
