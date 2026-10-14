import { Client } from "seyfert";
import handleGuildMessage from "./handleGuildMessage.js";
import { Action } from "../types/index.js";
import handleJoinLeaveMessage from "./handleJoinLeaveMessage.js";
import { CANNOT_SAY_MESSAGE_TWICE } from "../constants/global.js";
import { reactToPendingMessage } from "./pendingMessages.js";
import handleGuildInOutMessage from "./handleGuildInOutMessage.js";
import handleOfficerChatMessage from "./handleOfficerChatMessage.js";
import { getConfig } from "@config/load.js";

export default async function handleChatMessage(
  message: string,
  client: Client
) {
  const config = getConfig();

  if (config.bridge.printMessagesToConsole) {
    client.logger.info(message);
  }

  if (message === CANNOT_SAY_MESSAGE_TWICE) {
    reactToPendingMessage("❌");
    return;
  }

  const isOfficerChatMessage = message.startsWith("Officer >");
  const isGuildMessage = message.startsWith("Guild >");
  const isInOutMessage =
    message.includes("joined the guild!") ||
    message.includes("was kicked from the guild by") ||
    message.includes("left the guild!");

  if (!isGuildMessage && isInOutMessage) {
    await handleGuildInOutMessage(message, client);
    return;
  }

  const officerChatMessage = message.slice(10).split("\n")[0];

  // AI generated regular expression
  const officerChatMatch = officerChatMessage.match(
    /^\[([^\]]+)\]\s+(\S+)(?:\s+\[([^\]]+)\])?:\s*(.*)$/
  );

  if (isOfficerChatMessage && officerChatMatch && config.officerChat.enabled) {
    const [, rank, username, role, content] = officerChatMatch;

    await handleOfficerChatMessage(rank, username, role, content, client);
    return;
  }

  if (!isGuildMessage) {
    return;
  }

  const guildMessage = message.slice(8).split("\n")[0];

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
  const guildMessageMatch = guildMessage.match(
    /^\[([^\]]+)\]\s+(\S+)(?:\s+\[([^\]]+)\])?:\s*(.*)$/
  );

  if (!guildMessageMatch) {
    client.logger.warn(`Unrecognized guild message: ${message}`);
    return;
  }

  const [, rank, username, role, content] = guildMessageMatch;
  await handleGuildMessage(rank, username, role, content, client);
}
