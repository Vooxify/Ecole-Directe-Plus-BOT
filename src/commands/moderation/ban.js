const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    deleted: false,
    name: 'ban',
    description: 'ban somewone bahahha',
    options: [
        {
            name: 'usertag',
            description: 'The name of one member on the server',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason of the ban',
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
    callback: (client, interaction) => {
        interaction.reply(`BAN !!!`);
    },
};
