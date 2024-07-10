const { getChannelOptions } = require("../../utils/getChannelOptions");

function getStat(msg, inDevArray, currentlyInDevloppementArray) {
    const baseInfos = {
        "Utilisateurs mensuels": "mensualUsersNumber",
        "Retours positifs": "positiveFedbackNumber",
        "Progression": "progressPercentage",
        "Fonctionnalités en cours de développement": "featuresCountNumber",
        "Actuellement sur le dévloppement": "currentlyInDevloppementNumber",
    };

    let key = ["featuresCountArray", "currentlyInDevloppementArray"];
    let id = [inDevArray, currentlyInDevloppementArray];
    let i = 0;

    for (let [originalKey, newKey] of Object.entries(baseInfos)) {
        if (msg.includes(originalKey)) {
            key.push(newKey);
            let numbers = msg.match(/\d+/g);
            
            if (numbers) {
                id.push(parseInt(numbers[i++]));
            }
        }
    }
    
    return { key, id };
}

function createObject(keyList, valuesList) {
    let obj = keyList.reduce((acc, key, index) => {
        acc[key] = valuesList[index];
        return acc;
    }, {});
    
    return obj;
}

function getArray(msg, i) {
    let symbol;
    let statContent = [];

    if ( i === "inDev" ) {
        symbol = "\u21C1";
    }
    else if ( i === "modification" ) {
        symbol = "\u21C0";
    };
    
    let position = 0;
    
    while (true) {
        const symbolPosition = msg.indexOf(symbol, position);
    
        if ( symbolPosition === -1 ) {
            break;
        };

        const endLinePosition = msg.indexOf("\n", symbolPosition);
        let textAfterSymbol;

        if ( endLinePosition !== -1 ) {
            textAfterSymbol = msg.substring(symbolPosition+1, endLinePosition).trim();
        }
        else {
            textAfterSymbol = msg.substring(symbolPosition+1).trim();
        };
        statContent.push(textAfterSymbol);
        

        position = symbolPosition+1;
    };
    return statContent;
};


function organiseObject(obj) {
    let newObj = {
      global: {
        mensualUsers: obj.mensualUsersNumber,
        positiveFedback: obj.positiveFedbackNumber,
      },
      progress: obj.progressPercentage,
      featuresInDevloppement: {
        featuresCount: obj.featuresCountArray.length,
        features: [],
      },
      currentlyInDevloppement: {
        inDevCount: obj.currentlyInDevloppementArray.length,
        inDev: [],
      }
    };
  
    obj.featuresCountArray.forEach(function(index) {
        newObj.featuresInDevloppement.features.push(index);
    });
    obj.currentlyInDevloppementArray.forEach(function(index) {
        newObj.currentlyInDevloppement.inDev.push(index);
    })
    // console.log(newObj);
    return newObj;
  }
  
  

module.exports = {
    name: 'getlastmessage',
    description: "Get the latest message in a channel",

    callback: async (client, interaction) => {
        try {
            const statChannel = getChannelOptions(client, interaction, "1244728805654794311");

            if (!statChannel) {
                return interaction.reply({
                    content: `Channel not found.`,
                    ephemeral: true,
                });
            }
            
            const messages = await statChannel.messages.fetch({ limit: 1 });
            
            const lastStatMessage = messages.first();

            const member = await statChannel.guild.members.fetch(lastStatMessage.author.id);
            const role = member.roles.highest; // This will get the highest role of the member

            if (lastStatMessage && role.name === "Messenger") {
                await statChannel.send(`${lastStatMessage.content}`);
                await interaction.reply({
                    content: "Success",
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: `No messages in "${statChannel.name}" channel.`,
                    ephemeral: true,
                });
            }

            if (lastStatMessage && lastStatMessage.content.includes("Progression")) {
                const modifs = getArray(lastStatMessage.content, i="modification")
                const inDev = getArray(lastStatMessage.content, i="inDev")
                let { key, id } = getStat(lastStatMessage.content, inDevArray=inDev, modificationsArray=modifs);

                const statObject = createObject(key, id);
                
                const Stats = organiseObject(statObject)

                
                console.log(Stats)
                
            }

        } catch (error) {
            console.error('Error fetching last message:', error);
            await interaction.reply({
                content: `An error occurred: ${error.message}`,
                ephemeral: true,
            });
        }
    }
};
