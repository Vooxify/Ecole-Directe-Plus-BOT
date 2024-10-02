const path = require("path");
const getAllPaths = require("./getAllPaths");
const fs = require("fs");
// function getAllSubdirectories(dirPath) {
//     const subdirectories = [];

//     function exploreDirectory(currentPath) {
//         const entries = fs.readdirSync(currentPath, { withFileTypes: true });

//         for (const entry of entries) {
//             const fullPath = path.join(currentPath, entry.name);
//             console.log(fullPath);

//             if (entry.isDirectory()) {
//                 subdirectories.push(fullPath);
//                 exploreDirectory(fullPath);
//             }
//         }
//     }

//     exploreDirectory(dirPath);
//     return subdirectories;
// }
// console.log(getAllSubdirectories("../"));

// module.exports = (exceptions = [], excluded_dirs = []) => {
//     let paths = {};

//     // get all files and directories in the parent directory
//     const rawCommandCategories = getAllFiles(path.join(__dirname, ".."), true);

//     // filter out excluded directories
//     const commandCategories = rawCommandCategories.filter((filePath) => {
//         return !excluded_dirs.some((excludedDir) =>
//             filePath.includes(excludedDir)
//         );
//     });
//     // console.log(commandCategories);

//     // iterate through each directory
//     for (const commandCategorie of commandCategories) {
//         // get all files in the current directory
//         const commandFiles = getAllFiles(commandCategorie);
//         // add the directory and its files to the paths object
//         console.log(getAllSubdirectories(commandCategorie), "HELLOOOOOO");
//         paths[commandCategorie] = commandFiles;
//         // console.log(commandFiles);
//     }

//     // log and return the paths object
//     // console.log(paths);
//     return paths;
// };

/**
 * example return structure:
 * {
 *  "PATH1": [
 *      "FILE1.TXT",
 *      "FILE2.TXT",
 *      "FILE3.TXT"
 *  ],
 *  "PATH2": [
 *      "FILE4.TXT",
 *      "FILE5.TXT",
 *      "FILE6.TXT",
 *      "FILE7.TXT",
 *      "FILE8.TXT"
 *  ]
 * }
 */
