const path = require("path");
const getAllPaths = require("./getAllPaths");
const getLocalCommands = require("./getLocalCommands");

const rawRoutes = getAllPaths("../../src/", ["/utils"], ["index.js"], false);

console.log(rawRoutes);
