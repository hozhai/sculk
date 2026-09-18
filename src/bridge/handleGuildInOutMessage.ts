import { getConfig } from "@config/load.js";
import { finishEmbed } from "@utils/createEmbed.js";
import { Client, Embed } from "seyfert";

export default async function handleGuildInOutMessage(
  message: string,
  client: Client
) {
  // AI generated regular expression
  const joinedGuildMatch = message.match(
    /^\[([^\]]+)\]\s+(.+?) joined the guild!$/
  );

  const config = getConfig();
  const channelId = config.logs.channelId;

  if (joinedGuildMatch) {
    const [, rank, username] = joinedGuildMatch;
    client.logger.info(`${username} joined the guild!`);

    let embed = new Embed().setTitle("New member!");

    if (rank) {
      // TODO: random join messages??
      embed = embed.setDescription(
        `Give a warm welcome to [${rank}] **${username}**!`
      );
    } else {
      embed = embed.setDescription(`Give a warm welcome to **${username}**!`);
    }

    finishEmbed(embed);

    await client.messages.write(channelId, { embeds: [embed] });
    return;
  }

  // Also AI generated regexp
  const leftGuildMatch = message.match(
    /^\[([^\]]+)\]\s+(.+?) left the guild!$/
  );

  if (leftGuildMatch) {
    const [, rank, username] = leftGuildMatch;
    client.logger.info(`${username} left the guild!`);

    let embed = new Embed().setTitle("Someone left!");

    if (rank) {
      // IDEA: random join messages??
      embed = embed.setDescription(`Farewell, [${rank}] **${username}**!`);
    } else {
      embed = embed.setDescription(`Farewell, **${username}**!`);
    }

    finishEmbed(embed);

    await client.messages.write(channelId, { embeds: [embed] });
    return;
  }

  // AI generated regular expression
  const kickedGuildMatch = message.match(
    /^\[([^\]]+)\]\s+(.+?) was kicked from the guild by \[([^\]]+)\]\s+(.+?)!$/
  );

  if (kickedGuildMatch) {
    const [, rank, username, kickerRank, kickerUsername] = kickedGuildMatch;
    const shouldAnonymizeKicker = config.bridge.anonymizeKicker;

    client.logger.info(`${username} was kicked by ${kickerUsername}!`);

    let embed = new Embed().setTitle("A kick has occurred!");

    if (shouldAnonymizeKicker && rank) {
      embed = embed.setDescription(
        `[${rank}] ${username} was kicked from the guild!`
      );
    }

    if (shouldAnonymizeKicker && !rank) {
      embed = embed.setDescription(`${username} was kicked from the guild!`);
    }

    if (!shouldAnonymizeKicker && rank) {
      if (kickerRank) {
        embed = embed.setDescription(
          `[${rank}] ${username} was kicked from the guild by [${kickerRank}] ${kickerUsername}!`
        );
      } else {
        embed = embed.setDescription(
          `[${rank}] ${username} was kicked from the guild by ${kickerUsername}!`
        );
      }
    }

    if (!shouldAnonymizeKicker && !rank) {
      if (kickerRank) {
        embed = embed.setDescription(
          `${username} was kicked from the guild by [${kickerRank}] ${kickerUsername}!`
        );
      } else {
        embed = embed.setDescription(
          `${username} was kicked from the guild by ${kickerUsername}!`
        );
      }
    }

    finishEmbed(embed);

    await client.messages.write(channelId, { embeds: [embed] });
    return;
  }
}
