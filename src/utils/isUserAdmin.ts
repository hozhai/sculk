import { getConfig } from "@config/load.js";
import { GuildMember } from "seyfert";

export default async function isUserAdmin(
  member: GuildMember | null | undefined
): Promise<boolean> {
  const config = getConfig();
  const userRoles = ((await member?.roles.list()) ?? []).map((role) => role.id);
  const isUserAuthorized = userRoles.some((item) =>
    config.permission.adminRoles.includes(item)
  );

  return isUserAuthorized;
}
