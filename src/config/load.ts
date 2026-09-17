import fs from "node:fs";
import { parse } from "smol-toml";
import type { Config } from "../types/config.js";

let config: Config | null;

function toCamelCase(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function camelCaseKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(camelCaseKeys);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        toCamelCase(key),
        camelCaseKeys(entry),
      ])
    );
  }

  return value;
}

export function getConfig(): Config {
  if (config) return config;

  const content = fs.readFileSync("./config.toml", "utf-8");
  config = camelCaseKeys(parse(content)) as Config;
  return config;
}
