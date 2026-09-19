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
    const prefix = getConfig().bridge.prefix;

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

    if (config.bridge.replaceLink) {
      const urlPattern =
        /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
      messageContent = messageContent.replace(urlPattern, "[link]");
    }

    if (config.bridge.replaceAttachment) {
      if (message.attachments.length > 0) {
        messageContent += "[attachment(s)]";
      }
    }

    const nonMessageLength =
      prefix.length +
      message.author.username.length +
      separator.length +
      "/gc ".length;

    if (messageContent.length > 256 - nonMessageLength) {
      messageContent = messageContent.slice(
        0,
        256 - (nonMessageLength + "...".length)
      );
      messageContent += "...";
    }

    addPendingMessage(message);
    minecraft.chat(
      `/gc ${prefix}${message.author.username}${separator}${messageContent}`
    );
  },
});
