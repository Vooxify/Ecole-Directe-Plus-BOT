/* 

This function get the channel id and return the js object,
after, you can just use it without type always the same command, just call the function.

*/

function getChannelOptions(client, interaction, channelId) {
    statChannel = client.channels.cache.get(channelId);
    return statChannel;
}

/*

To the future, maybe add functions like this 'https://chat.mistral.ai/chat/acd45029-4a99-442d-8afb-ec81edaef89d'
like, 'get' to get, messageS, channel name, etc...
    --> Or the most important
    --> Or do something like this getChannelOptions.get(name) or getChannelOptions.get().name
    I see later

 */

module.exports = {
    getChannelOptions: getChannelOptions,
};
