import { getConfig } from "../config/load.js";
import * as mineflayer from "mineflayer";

let minecraft: mineflayer.Bot | null;

export function getMinecraft(): mineflayer.Bot {
  if (minecraft) return minecraft;

  const username = getConfig().account.email;

  minecraft = mineflayer.createBot({
    host: "mc.hypixel.net",
    port: 25565,
    username,
    auth: "microsoft",
  });

  return minecraft;
}
