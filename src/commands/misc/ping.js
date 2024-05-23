module.exports = {

    name: 'ping',
    description: 'Say Pong!',

    callback: (client, interaction) => {
        interaction.reply(`Pong ! ${client.ws.ping}ms`)
    }

}