import { Client, Embed } from "seyfert";
import { Action } from "../types/index.js";
import { getConfig } from "@config/load.js";
import { colorifyEmbed } from "@utils/createEmbed.js";

export default async function handleJoinLeaveMessage(
  username: string,
  action: Action | undefined,
  client: Client
) {
  const config = getConfig();
  const channelId = config.guildChat.channelId;
  const shouldSkycryptUsernames = config.bridge.skycryptedUsernames;

  const embed = shouldSkycryptUsernames
    ? new Embed().setDescription(
        `**[${username}](https://sky.shiiyu.moe/stats/${username})** has ${action} the server.`
      )
    : new Embed().setDescription(`**${username}** has ${action} the server.`);

  colorifyEmbed(embed);

  await client.messages.write(channelId, { embeds: [embed] });
}
