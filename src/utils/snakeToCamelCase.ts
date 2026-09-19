export function toCamelCase(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

export function camelCaseKeys(value: unknown): unknown {
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
