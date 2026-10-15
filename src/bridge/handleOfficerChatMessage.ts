import { Client } from "seyfert";
import { getMinecraft } from "./load.js";
import { removePendingMessage } from "./pendingMessages.js";
import { getConfig } from "@config/load.js";
import getIconURL from "@utils/getIconURL.js";

export default async function handleOfficerChatMessage(
  rank: string,
  username: string,
  role: string,
  content: string,
  client: Client
) {
  const botUsername = getMinecraft().player.username;

  if (botUsername.toLowerCase() === username.toLowerCase()) {
    removePendingMessage();
    return;
  }

  const config = getConfig();
  const webhookURL = config.officerChat.webhookUrl;
  const [webhookId, webhookToken] = webhookURL.split("/").slice(-2);

  const webhookName = config.bridge.webhookFormat
    .replaceAll("{rank}", rank)
    .replaceAll("{user}", username)
    .replaceAll("{role}", role);

  content = content.replaceAll("*", "\\*");
  content = content.replaceAll("_", "\\_");

  await client.webhooks.writeMessage(webhookId, webhookToken, {
    body: {
      username: webhookName,
      avatar_url: getIconURL(username),
      content: content,
    },
  });
}
