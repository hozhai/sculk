import { Client } from "seyfert";
import handleGuildMessage from "./handleGuildMessage.js";
import { Action } from "../types/index.js";
import handleJoinLeaveMessage from "./handleJoinLeaveMessage.js";
import { CANNOT_SAY_MESSAGE_TWICE } from "../constants/global.js";
import { reactToPendingMessage } from "./pendingMessages.js";
import handleGuildInOutMessage from "./handleGuildInOutMessage.js";

export default async function handleChatMessage(
  message: string,
  client: Client
) {
  // TODO: implement officer chat
  if (message === CANNOT_SAY_MESSAGE_TWICE) {
    reactToPendingMessage("❌");
    return;
  }

  const isGuildMessage = message.startsWith("Guild >");
  const isInOutMessage =
    message.includes("joined the guild!") ||
    message.includes("was kicked from the guild by") ||
    message.includes("left the guild!");

  if (!isGuildMessage && isInOutMessage) {
    await handleGuildInOutMessage(message, client);
    return;
  }

  if (!isGuildMessage) {
    return;
  }

  const guildMessage = message.slice(8);

  // AI generated regular expression
  const joinLeaveMatch = guildMessage.match(/^(.+)\s+(joined|left)\.$/);

  if (joinLeaveMatch) {
    const [, username, event] = joinLeaveMatch;
    let action: Action | undefined;
    if (event === "joined") {
      action = "joined";
    } else if (event === "left") {
      action = "left";
    }

    await handleJoinLeaveMessage(username, action, client);
    return;
  }

  // AI generated regular expression
  const match = guildMessage.match(
    /^\[([^\]]+)\]\s+(\S+)(?:\s+\[([^\]]+)\])?:\s*(.*)$/
  );

  if (!match) {
    client.logger.warn(`Unrecognized guild message: ${message}`);
    return;
  }

  const [, rank, username, role, content] = match;
  await handleGuildMessage(rank, username, role, content, client);
}
