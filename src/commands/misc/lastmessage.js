// import utility function to get channel options
const { getChannelOptions } = require("../../utils/getChannelOptions");
const { get_json_stat_channel_id } = require("./tools/get_json_content");

// function to extract statistics from a given message
function getStat(msg, inDevArray, currentlyInDevloppementArray) {
    // define base information to search in the message
    const baseInfos = {
        "Utilisateurs mensuels": "mensualUsersNumber", // monthly users count
        "Retours positifs": "positiveFedbackNumber", // positive feedback count
        Progression: "progressPercentage", // project progress percentage
        "Fonctionnalités en cours de développement": "featuresCountNumber", // features in development count
        "Actuellement sur le dévloppement": "currentlyInDevloppementNumber", // tasks currently in development count
    };

    // initialize keys and associated arrays
    let key = ["featuresCountArray", "currentlyInDevloppementArray"];
    let id = [inDevArray, currentlyInDevloppementArray];
    let i = 0;

    // iterate over each entry in baseInfos and check if the message contains a key
    for (let [originalKey, newKey] of Object.entries(baseInfos)) {
        if (msg.includes(originalKey)) {
            key.push(newKey); // add the key to the list
            let numbers = msg.match(/\d+/g); // search for numbers in the message

            if (numbers) {
                id.push(parseInt(numbers[i++])); // add the associated number
            }
        }
    }

    return { key, id }; // return found keys and values
}

// function to create an object from two lists (keys and values)
function createObject(keyList, valuesList) {
    let obj = keyList.reduce((acc, key, index) => {
        acc[key] = valuesList[index]; // associate each key with its value
        return acc;
    }, {});

    return obj; // return the object
}

// function to get elements from a message based on symbols
function getArray(msg, i) {
    let symbol;
    let statContent = [];

    // determine which symbol to use based on the type of information to extract
    if (i === "inDev") {
        symbol = "\u21C1"; // symbol for elements in development
    } else if (i === "modification") {
        symbol = "\u21C0"; // symbol for elements in modification
    }

    let position = 0;

    while (true) {
        // search for the position of the symbol in the message
        const symbolPosition = msg.indexOf(symbol, position);

        if (symbolPosition === -1) {
            break; // if no symbol is found, stop the loop
        }

        const endLinePosition = msg.indexOf("\n", symbolPosition); // search for the end of the line
        let textAfterSymbol;

        if (endLinePosition !== -1) {
            textAfterSymbol = msg
                .substring(symbolPosition + 1, endLinePosition)
                .trim(); // get the text after the symbol until the end of the line
        } else {
            textAfterSymbol = msg.substring(symbolPosition + 1).trim(); // get the text until the end of the message
        }
        statContent.push(textAfterSymbol); // add the extracted text to the array

        position = symbolPosition + 1; // update the position to continue the search
    }
    return statContent; // return the extracted content
}

// function to organize an object with statistics
function organiseObject(obj) {
    // create a new structured object to contain the statistics
    let newObj = {
        global: {
            mensualUsers: obj.mensualUsersNumber, // monthly users count
            positiveFedback: obj.positiveFedbackNumber, // positive feedback count
        },
        progress: obj.progressPercentage, // progress percentage
        featuresInDevloppement: {
            featuresCount: obj.featuresCountArray.length, // features in development count
            features: [], // list of features
        },
        currentlyInDevloppement: {
            inDevCount: obj.currentlyInDevloppementArray.length, // tasks in development count
            inDev: [], // list of tasks in development
        },
    };

    // add each feature to the corresponding array
    obj.featuresCountArray.forEach(function (index) {
        newObj.featuresInDevloppement.features.push(index);
    });

    // add each task in development to the corresponding array
    obj.currentlyInDevloppementArray.forEach(function (index) {
        newObj.currentlyInDevloppement.inDev.push(index);
    });

    return newObj; // return the organized object
}

// main module exported, containing the "getlastmessage" command
module.exports = {
    name: "getlastmessage", // command name
    description: "Get the latest message in a channel", // command description

    callback: async (client, interaction) => {
        try {
            const CHANNEL_ID_DYNAMIC = await get_json_stat_channel_id();
            // get channel options from the ID
            const statChannel = getChannelOptions(
                client,
                interaction,
                CHANNEL_ID_DYNAMIC.stat_channel_id
            );

            if (!statChannel) {
                return interaction.reply({
                    content: `Channel not found.`, // response if channel not found
                    ephemeral: true,
                });
            }

            // get the latest message from the channel
            const messages = await statChannel.messages.fetch({ limit: 1 });
            const lastStatMessage = messages.first(); // the latest message

            // get information about the message author and their role
            const member = await statChannel.guild.members.fetch(
                lastStatMessage.author.id
            );
            const role = member.roles.highest; // get the highest role of the author

            // check if the latest message was sent by a user with the "Messenger" role
            if (lastStatMessage && role.name === "Messenger") {
                await interaction.reply({
                    content: "Success", // success response
                    ephemeral: true,
                });

                await statChannel.send(`${lastStatMessage.content}`); // send the final message
            } else {
                await interaction.reply({
                    content: `No messages in "${statChannel.name}" channel.`, // response if no message found
                    ephemeral: true,
                });
            }

            // if the message contains progress information, extract the data
            if (
                lastStatMessage &&
                lastStatMessage.content.includes("Progression")
            ) {
                const modifs = getArray(
                    lastStatMessage.content,
                    (i = "modification")
                ); // get modifications
                const inDev = getArray(lastStatMessage.content, (i = "inDev")); // get elements in development

                // extract statistics from the message
                let { key, id } = getStat(
                    lastStatMessage.content,
                    (inDevArray = inDev),
                    (modificationsArray = modifs)
                );

                // create an object with the statistics and organize it
                const statObject = createObject(key, id);
                const Stats = organiseObject(statObject);
                // console.log(lastStatMessage.content);
                //console.log(Stats); display statistics in the console
            }
        } catch (error) {
            // handle errors and send an error message to the user
            console.error("Error fetching last message:", error);
            await interaction.reply({
                content: `An error occurred: ${error.message}`,
                ephemeral: true,
            });
        }
    },
};
