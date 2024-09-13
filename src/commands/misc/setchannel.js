const { ApplicationCommandOptionType } = require("discord.js");
const getStatChannelId = (interaction) => {
  const ID = interaction.options.getChannel("id").guild.id;

  if (ID === null) {
    interaction.reply({
      content: "!!! You need to execute '/setchannel' to set the channel !!!",
      ephemeral: true,
    });
  } else {
    return ID; // get ID
  }
};
module.exports = {
  getStatChannelId,
  name: "setchannel",
  description: "To set the channel with the least message",
  options: [
    {
      name: "id",
      required: true,
      type: ApplicationCommandOptionType.Channel,
      description: "The channel ID",
    },
  ],
  callback: async (client, interaction) => {
    console.log(
      getStatChannelId(interaction.options.getChannel("id").guild.id)
    );
  },
};

// use the command /setchannel to save the channel (where we take the last message) id. and use it in the lastmessage.js
