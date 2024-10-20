const { ApplicationCommandOptionType } = require("discord.js");
const { description, options } = require("./login");

module.exports = {
    name: "getinfos",
    description: "Get Statistics",
    options: [
        {
            name: "startdate",
            type: ApplicationCommandOptionType.String,
        },
    ],
    callback: async (client, interaction) => {},
};
