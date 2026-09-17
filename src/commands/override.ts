import {
  Declare,
  Command,
  type CommandContext,
  Options,
  createStringOption,
  Embed,
} from "seyfert";
import isUserAdmin from "@utils/isUserAdmin.js";
import { finishEmbed } from "@utils/createEmbed.js";
import { getMinecraft } from "@bridge/load.js";

const options = {
  msg: createStringOption({
    description: "The message to send. Append a / to turn it into a command.",
    required: true,
  }),
};

@Declare({
  name: "override",
  description: "Send a message or command through the guild bot.",
})
@Options(options)
export default class PingCommand extends Command {
  override async run(ctx: CommandContext<typeof options>) {
    const isUserAuthorized = await isUserAdmin(ctx.member);

    if (!isUserAuthorized) {
      const embed = new Embed()
        .setTitle("No permission")
        .setDescription(
          "You do not have the permission to execute this command.\nIf you set the guild bot up and believe this is an error, make sure you have at least one of the roles defined in config.toml."
        );

      finishEmbed(embed, true);

      await ctx.write({
        embeds: [embed],
      });
      return;
    }

    getMinecraft().chat(ctx.options.msg);

    const embed = new Embed()
      .setTitle("Sent!")
      .setDescription(`Content: \`${ctx.options.msg}\``);

    finishEmbed(embed);

    await ctx.write({
      embeds: [embed],
    });
  }
}
