const fs = require('fs');
const JSON_F = './src/commands/misc/config/channel_id.json'; // Path to the JSON file

// Function that returns a Promise to read the JSON file
const get_json_stat_channel_id = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(JSON_F, 'utf-8', (error, data) => {
            if (error) return reject(error); // Reject the Promise if there's an error
            resolve(JSON.parse(data)); // Resolve the Promise with the parsed data
        });
    });
};

module.exports = { get_json_stat_channel_id };
