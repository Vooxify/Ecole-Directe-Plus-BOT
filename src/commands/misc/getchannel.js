const { DiscordAPIError } = require("discord.js");
const { get_json_stat_channel_id } = require("./tools/get_json_content");


module.exports = {
    name: "getchannel",
    description: "Get the last setted id channel",
    callback : async (client, interaction) => {
        try {
            const json_id = await get_json_stat_channel_id();
            channel_link = await client.channels.fetch(json_id.stat_channel_id)
            interaction.reply({
                content: `The setted channel where message will be sent is ${channel_link}, you can change it with '/setchannel [<channel>]'`,
                ephemeral: true
            })
        }
        catch (DiscordAPIError) {
            interaction.reply({
                content: "The channel saved is unrecognized, set it with '/setchannel [<channel>]'",
                ephemeral: true
            })
        }
    }
}