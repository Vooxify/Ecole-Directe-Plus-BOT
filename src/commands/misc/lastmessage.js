// Importation de la fonction utilitaire qui permet d'obtenir les options du canal
const { getChannelOptions } = require('../../utils/getChannelOptions');
const { get_json_stat_channel_id } = require('./tools/get_json_content');

// Fonction qui extrait des statistiques d'un message donné
function getStat(msg, inDevArray, currentlyInDevloppementArray) {
    // Définition des informations de base à rechercher dans le message
    const baseInfos = {
        'Utilisateurs mensuels': 'mensualUsersNumber', // Nombre d'utilisateurs mensuels
        'Retours positifs': 'positiveFedbackNumber', // Nombre de retours positifs
        Progression: 'progressPercentage', // Progression du projet en pourcentage
        'Fonctionnalités en cours de développement': 'featuresCountNumber', // Nombre de fonctionnalités en développement
        'Actuellement sur le dévloppement': 'currentlyInDevloppementNumber', // Nombre de tâches actuellement en développement
    };

    // Initialisation des clés et des tableaux associés
    let key = ['featuresCountArray', 'currentlyInDevloppementArray'];
    let id = [inDevArray, currentlyInDevloppementArray];
    let i = 0;

    // Parcourt chaque entrée de baseInfos et vérifie si le message contient une clé
    for (let [originalKey, newKey] of Object.entries(baseInfos)) {
        if (msg.includes(originalKey)) {
            key.push(newKey); // Ajoute la clé à la liste
            let numbers = msg.match(/\d+/g); // Recherche des nombres dans le message

            if (numbers) {
                id.push(parseInt(numbers[i++])); // Ajoute le nombre associé
            }
        }
    }

    return { key, id }; // Retourne les clés et les valeurs trouvées
}

// Fonction qui crée un objet à partir de deux listes (clés et valeurs)
function createObject(keyList, valuesList) {
    let obj = keyList.reduce((acc, key, index) => {
        acc[key] = valuesList[index]; // Associe chaque clé à sa valeur
        return acc;
    }, {});

    return obj; // Retourne l'objet
}

// Fonction qui récupère les éléments d'un message basés sur des symboles
function getArray(msg, i) {
    let symbol;
    let statContent = [];

    // Détermine quel symbole utiliser selon le type d'information à extraire
    if (i === 'inDev') {
        symbol = '\u21C1'; // Symbole pour les éléments en développement
    } else if (i === 'modification') {
        symbol = '\u21C0'; // Symbole pour les éléments en modification
    }

    let position = 0;

    while (true) {
        // Recherche la position du symbole dans le message
        const symbolPosition = msg.indexOf(symbol, position);

        if (symbolPosition === -1) {
            break; // Si aucun symbole n'est trouvé, arrête la boucle
        }

        const endLinePosition = msg.indexOf('\n', symbolPosition); // Recherche la fin de la ligne
        let textAfterSymbol;

        if (endLinePosition !== -1) {
            textAfterSymbol = msg
                .substring(symbolPosition + 1, endLinePosition)
                .trim(); // Récupère le texte après le symbole jusqu'à la fin de la ligne
        } else {
            textAfterSymbol = msg.substring(symbolPosition + 1).trim(); // Récupère le texte jusqu'à la fin du message
        }
        statContent.push(textAfterSymbol); // Ajoute le texte extrait au tableau

        position = symbolPosition + 1; // Met à jour la position pour continuer la recherche
    }
    return statContent; // Retourne le contenu extrait
}

// Fonction qui organise un objet avec des statistiques
function organiseObject(obj) {
    // Crée un nouvel objet structuré pour contenir les statistiques
    let newObj = {
        global: {
            mensualUsers: obj.mensualUsersNumber, // Nombre d'utilisateurs mensuels
            positiveFedback: obj.positiveFedbackNumber, // Nombre de retours positifs
        },
        progress: obj.progressPercentage, // Pourcentage de progression
        featuresInDevloppement: {
            featuresCount: obj.featuresCountArray.length, // Nombre de fonctionnalités en développement
            features: [], // Liste des fonctionnalités
        },
        currentlyInDevloppement: {
            inDevCount: obj.currentlyInDevloppementArray.length, // Nombre de tâches en développement
            inDev: [], // Liste des tâches en développement
        },
    };

    // Ajoute chaque fonctionnalité au tableau correspondant
    obj.featuresCountArray.forEach(function (index) {
        newObj.featuresInDevloppement.features.push(index);
    });

    // Ajoute chaque tâche en développement au tableau correspondant
    obj.currentlyInDevloppementArray.forEach(function (index) {
        newObj.currentlyInDevloppement.inDev.push(index);
    });

    return newObj; // Retourne l'objet organisé
}

// Module principal exporté, contenant la commande "getlastmessage"
module.exports = {
    name: 'getlastmessage', // Nom de la commande
    description: 'Get the latest message in a channel', // Description de la commande

    callback: async (client, interaction) => {
        try {
            const CHANNEL_ID_DYNAMIC = await get_json_stat_channel_id();
            // Récupère les options du canal à partir de l'ID
            const statChannel = getChannelOptions(
                client,
                interaction,
                CHANNEL_ID_DYNAMIC.stat_channel_id
            );

            if (!statChannel) {
                return interaction.reply({
                    content: `Channel not found.`, // Réponse si le canal n'est pas trouvé
                    ephemeral: true,
                });
            }

            // Récupère le dernier message du canal
            const messages = await statChannel.messages.fetch({ limit: 1 });
            const lastStatMessage = messages.first(); // Le dernier message

            // Récupère les informations sur l'auteur du message et son rôle
            const member = await statChannel.guild.members.fetch(
                lastStatMessage.author.id
            );
            const role = member.roles.highest; // Récupère le rôle le plus élevé de l'auteur

            // Vérifie si le dernier message a été envoyé par un utilisateur avec le rôle "Messenger"
            if (lastStatMessage && role.name === 'Messenger') {
                await interaction.reply({
                    content: 'Success', // Réponse de succès
                    ephemeral: true,
                });

                await statChannel.send(`${lastStatMessage.content}`); // Envoie le message final
            } else {
                await interaction.reply({
                    content: `No messages in "${statChannel.name}" channel.`, // Réponse si aucun message trouvé
                    ephemeral: true,
                });
            }

            // Si le message contient des informations sur la progression, extrait les données
            if (
                lastStatMessage &&
                lastStatMessage.content.includes('Progression')
            ) {
                const modifs = getArray(
                    lastStatMessage.content,
                    (i = 'modification')
                ); // Récupère les modifications
                const inDev = getArray(lastStatMessage.content, (i = 'inDev')); // Récupère les éléments en développement

                // Extrait les statistiques du message
                let { key, id } = getStat(
                    lastStatMessage.content,
                    (inDevArray = inDev),
                    (modificationsArray = modifs)
                );

                // Crée un objet avec les statistiques et les organise
                const statObject = createObject(key, id);
                const Stats = organiseObject(statObject);
                console.log(lastStatMessage.content);
                console.log(Stats); // Affiche les statistiques dans la console
            }
        } catch (error) {
            // Gère les erreurs et envoie un message d'erreur à l'utilisateur
            console.error('Error fetching last message:', error);
            await interaction.reply({
                content: `An error occurred: ${error.message}`,
                ephemeral: true,
            });
        }
    },
};
