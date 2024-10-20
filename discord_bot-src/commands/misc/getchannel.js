module.exports = {
    name: "getchannel",
    description: "Get the last set channel ID",
    callback: async (client, interaction) => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/discord/stat_channel/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        commandMethod: "get",
                    }),
                }
            );

            if (!response.ok) {
                return interaction.reply({
                    content: `:x: ERROR : ${await response.text()}`,
                    ephemeral: true,
                });
            }

            const data = await response.json();

            const channelId = data.channelId.replace(/"/g, ""); // remove ""
            const channelLink = await client.channels.fetch(channelId);

            if (!channelLink) {
                return interaction.reply({
                    content:
                        ":x: Could not find the channel. Set it with /setchannel <channel>",
                    ephemeral: true,
                });
            }

            return interaction.reply({
                content: `:white_check_mark: Statistics channel is : ${channelLink}`,
                ephemeral: true,
            });
        } catch (error) {
            return interaction.reply({
                content: `:x: There was an error: ${error.message}`,
                ephemeral: true,
            });
        }
    },
};
