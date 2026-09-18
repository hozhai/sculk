// config interface
export interface Config {
  branding: Branding;
  account: Account;
  bridge: Bridge;
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

interface Bridge {
  skycryptedUsernames: boolean;
  separator: string;
  webhookFormat: string;
  prefix: string;
  bypassDiscordString: boolean;
  anonymizeKicker: boolean;
  replaceLink: boolean;
  replaceAttachment: boolean;
}

interface GuildChat {
  channelId: string;
  webhookUrl: string;
}

interface OfficerChat {
  enabled: boolean;
  channelId: string;
  webhookUrl: string;
}

interface Logs {
  channelId: string;
}

interface Permission {
  adminRoles: string[];
}
