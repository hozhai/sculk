import { getMinecraft } from "@bridge/load.js";
import { Declare, Command, type CommandContext } from "seyfert";

@Declare({
  name: "ping",
  description: "Show latency with Discord",
})
export default class PingCommand extends Command {
  override async run(ctx: CommandContext) {
    // average latency between existing connections
    const discordPing = ctx.client.gateway.latency;
    const hypixelPing = getMinecraft().player.ping;

    await ctx.write({
      content:
        `Pong!\n* The Discord API latency is \`${discordPing}ms\`.\n* The Hypixel server latency is \`${hypixelPing}ms\`.`,
    });
  }
}
