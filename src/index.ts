import { Client } from "seyfert";

const client = new Client();

await client
  .start()
  .then(() => client.uploadCommands({ cachePath: "./commands.json" }));
