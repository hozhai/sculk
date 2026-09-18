import { getConfig } from "@config/load.js";
import { VERSION } from "@constants/global.js";
import { Embed } from "seyfert";
import { ColorResolvable } from "seyfert/lib/common/index.js";

/*
 * No need to return `embed`, as the embed object is pass by reference.
 * Just modifying it is enough.
 */

export function colorifyEmbed(embed: Embed, isError: boolean | null = false) {
  const config = getConfig();
  const color = isError
    ? (config.branding.colorFail as ColorResolvable)
    : (config.branding.color as ColorResolvable);

  embed.setColor(color);
}

export function finishEmbed(embed: Embed, isError: boolean | null = false) {
  const config = getConfig();
  const color = isError
    ? (config.branding.colorFail as ColorResolvable)
    : (config.branding.color as ColorResolvable);

  embed.setColor(color).setFooter({
    text: `Made with <3 | Running on ${config.branding.name} ${VERSION}`,
  });
}
