import { getMinecraft } from "@bridge/load.js";
import { createEvent } from "seyfert";

export default createEvent({
  data: { once: true, name: "botReady" },
  run(user, client) {
    client.logger.info(
      `${user.username}#${user.discriminator} (${user.id}) is ready`
    );

    // load mineflayer
    getMinecraft();

    // we HAVE to call getMinecraft() every time
    // otherwise we get a bunch of errors :)
    getMinecraft().on("spawn", () => {
      getMinecraft().chat("/limbo");
    });

    client.logger.info(`Succesfully connected and executed /limbo`);
  },
});
