import * as mineflayer from "mineflayer";
import handleChatMessage from "./handleChatMessage.js";
import { Client } from "seyfert";
import reconnect from "./reconnect.js";

export default function applyEvents(minecraft: mineflayer.Bot, client: Client) {
  minecraft.on("spawn", () => {
    minecraft.chat("/limbo");
  });

  minecraft.on("messagestr", async (message) => {
    await handleChatMessage(message, client);
  });

  minecraft.on("kicked", (reason) => {
    client.logger.warn(`Bot kicked due to: ${reason}`);
    setTimeout(() => reconnect(client), 5 * 1000)
  })

  minecraft.on("end", () => {
    client.logger.warn(`Bot connection ended.`);
    setTimeout(() => reconnect(client), 5 * 1000)
  })

  minecraft.on("error", (err) => {
    client.logger.error(`Error:`)
    client.logger.error(`- Cause: ${JSON.stringify(err.cause)}`)
    client.logger.error(`- Name: ${err.name}`)
    client.logger.error(`- Message: ${err.message}`)
  })

  client.logger.info(`Succesfully connected and executed /limbo`);
}
