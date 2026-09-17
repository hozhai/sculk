import { getConfig } from "@config/load.js";
import { VERSION } from "@constants/global.js";
import { Embed } from "seyfert";
import { ColorResolvable } from "seyfert/lib/common/index.js";

export function finishEmbed(
  embed: Embed,
  isError: boolean | null = false
): Embed {
  const config = getConfig();
  const color = isError
    ? (config.branding.colorFail as ColorResolvable)
    : (config.branding.color as ColorResolvable);

  embed
    .setColor(color)
    .setFooter({ text: `Made with <3 | Running on Sculk ${VERSION}` });

  return embed;
}
