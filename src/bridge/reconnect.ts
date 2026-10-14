import { getConfig } from "@config/load.js";
import * as mineflayer from "mineflayer";
import applyEvents from "./applyEvents.js";
import { Client } from "seyfert";
import { setMinecraft } from "./load.js";

export default function reconnect(client: Client) {
  const username = getConfig().account.email;

  const minecraft = mineflayer.createBot({
    host: "mc.hypixel.net",
    port: 25565,
    username,
    auth: "microsoft",
  });

  applyEvents(minecraft, client);

  setMinecraft(minecraft);
}
