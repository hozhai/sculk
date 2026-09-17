import { Declare, Command, type CommandContext } from "seyfert";

@Declare({
  name: "ping",
  description: "Show latency with Discord",
})
export default class PingCommand extends Command {
  override async run(ctx: CommandContext) {
    // Average latency between existing connections
    const ping = ctx.client.gateway.latency;

    await ctx.write({
      content: `Pong! The latency is \`${ping}ms\``,
    });
  }
}
