import fs from "node:fs";
import { parse } from "smol-toml";
import type { Config } from "../types/index.js";
import { camelCaseKeys } from "@utils/snakeToCamelCase.js";

let config: Config | null;

export function getConfig(): Config {
  if (config) return config;

  const content = fs.readFileSync("./config.toml", "utf-8");
  config = camelCaseKeys(parse(content)) as Config;
  return config;
}
