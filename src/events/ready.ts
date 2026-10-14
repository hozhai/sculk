import applyEvents from "@bridge/applyEvents.js";
import { getMinecraft } from "@bridge/load.js";
import { createEvent } from "seyfert";

export default createEvent({
  data: { once: true, name: "botReady" },
  run(user, client) {
    client.logger.info(
      `${user.username}#${user.discriminator} (${user.id}) is ready`
    );

    // load mineflayer
    const minecraft = getMinecraft();

    applyEvents(minecraft, client);
  },
});
