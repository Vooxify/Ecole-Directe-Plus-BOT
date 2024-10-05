/* --------------------------------- modules -------------------------------- */

const path = require("path");
const fs = require("fs");
const express = require("express");

/* ---------------------------------- files --------------------------------- */

const getAllPaths = require("./getAllPaths");

/* ------------------------------- statics var ------------------------------ */

const app = express();
const apiPath = "../";

/* -------------------------------- functions ------------------------------- */

/* --------------------------------- content -------------------------------- */

const handleAPIFunctioning = getAllPaths(apiPath, ["/utils"], ["index.js"]); // object with 2 different paths
const outPath = handleAPIFunctioning?.outPath;
const rawOutPath = handleAPIFunctioning?.rawOutPath;
const rawFilesPost =
    handleAPIFunctioning?.filesRequest?.filesPost?.rawPostFiles;
const rawFilesGet = handleAPIFunctioning?.filesRequest?.filesGet?.rawGetFiles;
const postFiles = handleAPIFunctioning?.filesRequest?.filesPost?.postFiles;
const getFiles = handleAPIFunctioning?.filesRequest?.filesGet?.getFiles;

// console.log(outPath);
// console.log(rawOutPath);
// console.log(rawFilesPost);
// console.log(rawFilesGet);
// console.log(postFiles);
// console.log(getFiles);
console.log(handleAPIFunctioning);

// review api system

// app.use(express.json());
// // console.log(rawPath);
// // console.log(convertedPath);
// const rawPath = rawRoutes.rawOutPath;
// const convertedPath = rawRoutes.outPath;
// // console.log(fileName);
// for (let i = 0; i < convertedPath.length; i++) {
//     try {
//         const apiRouteFile = `${rawPath[i]}\\route.js`;

//         try {
//             const routeHandler = require(apiRouteFile);

//             app.get(convertedPath[i], routeHandler);
//         } catch (error) {
//             console.log(`[!] There's not exported content in ${apiRouteFile}`);
//             process.exit();
//         }
//     } catch (error) {
//         console.log(
//             `[!] An error was occured ! ${error}\nPlease check the file or exclude him at the function call`
//         );
//         process.exit();
//     }
// }

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Running at localhost:${PORT}`);
// });
