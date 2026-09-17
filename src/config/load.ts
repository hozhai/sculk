import fs from "node:fs";
import { parse } from "smol-toml";
import type { Config } from "../types/config";

let config: Config | null;

export function getConfig(): Config {
  if (config) return config;

  const content = fs.readFileSync("./config.toml", "utf-8");
  config = parse(content) as unknown as Config;
  return config;
}
