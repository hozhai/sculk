import handleChatMessage from "@bridge/handleChatMessage.js";
import { getMinecraft } from "@bridge/load.js";
import { createEvent } from "seyfert";

export default createEvent({
  data: { once: true, name: "botReady" },
  run(user, client) {
    client.logger.info(
      `${user.username}#${user.discriminator} (${user.id}) is ready`
    );

    // load mineflayer
    const minecraft = getMinecraft();

    minecraft.on("spawn", () => {
      minecraft.chat("/limbo");
    });

    minecraft.on("messagestr", async (message) => {
      await handleChatMessage(message, client);
    });

    client.logger.info(`Succesfully connected and executed /limbo`);
  },
});
