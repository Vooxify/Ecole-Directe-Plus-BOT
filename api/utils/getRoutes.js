const path = require("path");
const getAllPaths = require("./getAllPaths");
const getLocalCommands = require("./getLocalCommands");

const rawRoutes = getAllPaths("../", ["/utils"], [], true);

console.log(rawRoutes);
