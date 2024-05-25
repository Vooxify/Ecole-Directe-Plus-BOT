module.exports = {
    name: 'hello',
    description: "Say hello to be polite ! :-)",
    callback: ( client, interaction ) => {
        interaction.reply("Hello, or Hi ;-)")
    }
}