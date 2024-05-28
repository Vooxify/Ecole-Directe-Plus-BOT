const { getChannelOptions } = require("../../utils/getChannelOptions");

  module.exports = {
    name: 'getlastmessage',
    description: "Get the least message in a channel",
  
    callback: async (client, interaction) => {

      statChannel = getChannelOptions(client, interaction, "1245061109216706662")
      console.log(statChannel)

  try {
    
    const messages = await statChannel.messages.fetch({ limit: 1 })
    lastStatMessage = messages.first()

    if (lastStatMessage) {
      // This method was not definitive
      statChannel.send(`Last message is \n: ${lastStatMessage}`)
    }

    else {
      // This method was not definitive
      interaction.reply({
        content: `Any messages in "${statChannel.name}" channel`,
        ephemeral: true,
      })
    }

  } catch (error) {
    interaction.reply({
      content: `An error was occured : ${error}`,
      ephemeral: true,
    })
  }

    }
  };
  
  // This file is not finished.