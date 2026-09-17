// config interface
export interface Config {
  email: string;
  guildChat: GuildChat;
  officerChat: OfficerChat;
  logs: Logs;
  permission: Permission;
}

interface GuildChat {
  channelId: number;
  webhookURL: string;
}

interface OfficerChat {
  channelId: number;
  webhookURL: string;
}

interface Logs {
  channelId: number;
}

interface Permission {
  adminRoles: number[];
}
