const path = require("path");
const getAllPaths = require("./getAllPaths");
const getLocalCommands = require("./getLocalCommands");
const express = require("express");

const app = express();

const rawRoutes = getAllPaths("../", ["/utils"], ["index.js"]); // object with 2 different paths
const rawPath = rawRoutes.rawOutPath;
const convertedPath = rawRoutes.outPath;

console.log(rawRoutes);
console.log(rawPath);
console.log(convertedPath);

console.log(rawPath.length);
for (let i = 0; i < convertedPath.length; i++) {
    try {
        const routeHandler = require(`${rawPath[i]}\\route.js`); // tester l'existence d'un fichier proprement
        console.log(routeHandler);
        app.get(convertedPath[i], routeHandler);
    } catch (error) {
        console.log(
            `[!] An error was occured ! ${error}\nPlease check the file or exclude him at the function call`
        );
        process.exit();
    }
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Running at localhost:${PORT}`);
});
