const { ApplicationCommandOptionType } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "setchannel",
    description: "set channel id",
    options: [
        {
            name: "id",
            description: "id desc",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
    ], // http://localhost:3000/api/increment_visits/
    callback: async (client, interraction) => {
        const statChannelId = interraction.options._hoistedOptions[0].value; // get channel id param
        const statChannel = await client.channels.fetch(statChannelId);

        fetch(
            `http://localhost:3000/api/discord/stat_channel?id=${statChannelId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    commandMethod: "set",
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    interraction.reply({
                        content: `:x: ERROR : ${response.json}`,
                        ephemeral: true,
                    });
                }
                return response.json();
            })
            .then((data) => {
                interraction.reply({
                    content: `:white_check_mark: ${JSON.stringify(data.message)
                        .replace(`${statChannelId}`, `${statChannel}`)
                        .replace(/"/g, "")}`, // remove this -> ""
                    ephemeral: true,
                });
            })
            .catch((error) => {
                interraction.reply({
                    content: `:x: There was an error : ${error}`,
                    ephemeral: true,
                });
            });
    },
};

/**
 * (1) --> ["/set id:1234"]
 ChatInputCommandInteraction {
  type: 2,
  id: '1284471876256534528',
  applicationId: '1242564291056373770',
  channelId: '1251912807159562270',
  guildId: '1242563383195340812',
  user: User {
    id: '744177952346079253',
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 256 },
    username: 'vooxis_',
    globalName: '『 • ᛖᗩナᖇīՏᙢ • 』',
    discriminator: '0',
    avatar: '7262eb94eeb98cbba50c745b0b112ce1',
    banner: undefined,
    accentColor: undefined,
    avatarDecoration: null
  },
  member: GuildMember {
    guild: Guild {
      id: '1242563383195340812',
      name: 'BOT TESTING',
      icon: null,
      features: [],
      commands: [GuildApplicationCommandManager],
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      bans: [GuildBanManager],
      roles: [RoleManager],
      presences: PresenceManager {},
      voiceStates: [VoiceStateManager],
      stageInstances: [StageInstanceManager],
      invites: [GuildInviteManager],
      scheduledEvents: [GuildScheduledEventManager],
      autoModerationRules: [AutoModerationRuleManager],
      available: true,
      shardId: 0,
      splash: null,
      banner: null,
      description: null,
      verificationLevel: 0,
      vanityURLCode: null,
      nsfwLevel: 0,
      premiumSubscriptionCount: 0,
      discoverySplash: null,
      memberCount: 3,
      large: false,
      premiumProgressBarEnabled: false,
      applicationId: null,
      afkTimeout: 300,
      afkChannelId: null,
      systemChannelId: null,
      premiumTier: 0,
      widgetEnabled: null,
      widgetChannelId: null,
      explicitContentFilter: 0,
      mfaLevel: 0,
      joinedTimestamp: 1720641810247,
      defaultMessageNotifications: 0,
      systemChannelFlags: [SystemChannelFlagsBitField],
      maximumMembers: 500000,
      maximumPresences: null,
      maxVideoChannelUsers: 25,
      maxStageVideoChannelUsers: 50,
      approximateMemberCount: null,
      approximatePresenceCount: null,
      vanityURLUses: null,
      rulesChannelId: null,
      publicUpdatesChannelId: null,
      preferredLocale: 'en-US',
      safetyAlertsChannelId: null,
      ownerId: '744177952346079253',
      emojis: [GuildEmojiManager],
      stickers: [GuildStickerManager]
    },
    joinedTimestamp: 1716320596285,
    premiumSinceTimestamp: null,
    nickname: null,
    pending: false,
    communicationDisabledUntilTimestamp: null,
    user: User {
      id: '744177952346079253',
      bot: false,
      system: false,
      flags: [UserFlagsBitField],
      username: 'vooxis_',
      globalName: '『 • ᛖᗩナᖇīՏᙢ • 』',
      discriminator: '0',
      avatar: '7262eb94eeb98cbba50c745b0b112ce1',
      banner: undefined,
      accentColor: undefined,
      avatarDecoration: null
    },
    avatar: null,
    flags: GuildMemberFlagsBitField { bitfield: 0 }
  },
  version: 1,
  appPermissions: PermissionsBitField { bitfield: 2251799813685247n },
  memberPermissions: PermissionsBitField { bitfield: 2251799813685247n },
  locale: 'en-US',
  guildLocale: 'en-US',
  entitlements: Collection(0) [Map] {},
  commandId: '1284469773673173053',
  commandName: 'set',
  commandType: 1,
  commandGuildId: '1242563383195340812',
  deferred: false,
  replied: false,
  ephemeral: null,
  webhook: InteractionWebhook { id: '1242564291056373770' },
  options: CommandInteractionOptionResolver {
    _group: null,
    _subcommand: null,
    _hoistedOptions: [
    {
      name: 'id',
      type: 7,
      value: '1260689987620442195',<-- This contain the value of the parameter
      channel: [TextChannel]
    }
    ]
  } 
  }
}
 */
