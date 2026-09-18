import { getMinecraft } from "@bridge/load.js";
import { addPendingMessage } from "@bridge/pendingMessages.js";
import { getConfig } from "@config/load.js";
import { createEvent } from "seyfert";

export default createEvent({
  data: { once: false, name: "messageCreate" },
  run(message, _client) {
    if (message.author.bot) return;

    const config = getConfig();

    if (
      message.channelId !== config.guildChat.channelId &&
      message.channelId !== config.officerChat.channelId
    )
      return;

    const minecraft = getMinecraft();
    const separator = getConfig().bridge.separator;

    if (
      message.channelId === config.officerChat.channelId &&
      config.officerChat.enabled
    ) {
      addPendingMessage(message);
      minecraft.chat(
        `/gc ${message.author.username}${separator}${message.content}`
      );
      return;
    }

    // TODO: implement officer chat
    let messageContent = message.content;

    if (config.bridge.bypassDiscordString) {
      messageContent = messageContent.replaceAll("discord", "disc0rd");
    }

    const urlPattern =
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
    messageContent = messageContent.replace(urlPattern, "[URL removed]");

    addPendingMessage(message);
    minecraft.chat(
      `/gc ${message.author.username}${separator}${messageContent}`
    );
  },
});
