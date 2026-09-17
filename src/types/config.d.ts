// config interface
export interface Config {
  branding: Branding;
  account: Account;
  guildChat: GuildChat;
  officerChat: OfficerChat;
  logs: Logs;
  permission: Permission;
}

interface Branding {
  name: string;
  color: string;
  colorFail: string;
}

interface Account {
  email: string;
}

interface GuildChat {
  channelId: string;
  webhookURL: string;
}

interface OfficerChat {
  enabled: boolean;
  channelId: string;
  webhookURL: string;
}

interface Logs {
  channelId: string;
}

interface Permission {
  adminRoles: string[];
}
