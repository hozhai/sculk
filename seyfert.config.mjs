import { config } from "seyfert";

export default config.bot({
  // oxlint-disable-next-line typescript/no-unsafe-assignment typescript/no-unsafe-member-access
  token: process.env.BOT_TOKEN ?? "",
  locations: {
    base: "src", // replace with "src" if using bun
    commands: "commands",
    events: "events",
  },
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});
