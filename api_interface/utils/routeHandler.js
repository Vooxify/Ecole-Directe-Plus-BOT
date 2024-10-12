/* ---------------------------------- files --------------------------------- */

const Format = require("./handleFormat");
const getAllPaths = require("./getAllPaths");

const jsonConfig = require("../config.json"); // important !

/* ------------------------------- middleware ------------------------------- */

const format = new Format();

/* --------------------------------- modules -------------------------------- */

const express = require("express");
const app = express();
app.use(express.json());
/*
 * this function save all code
 * with them, "routeHandler.js" be executed in the utils folder
 * not in the base path. Like this np of dir with "../" for ex
 */
process.chdir(__dirname);

/* ------------------------------- statics var ------------------------------ */

const handleAPIFunctioning = getAllPaths(
    jsonConfig.api_routes_path,
    jsonConfig.excluded_routes,
    jsonConfig.excluded_files
); // object with 2 different paths
// This function is the base for all program <3

// uncomment these lines if you want to use datas...

// const outPath = handleAPIFunctioning?.outPath;
// const rawOutPath = handleAPIFunctioning?.rawOutPath;
// const rawFiles = handleAPIFunctioning?.rawFiles;

const rawFilesPost =
    handleAPIFunctioning?.filesRequest?.filesPost?.rawPostFiles;
const rawFilesGet = handleAPIFunctioning?.filesRequest?.filesGet?.rawGetFiles;
const postFiles = handleAPIFunctioning?.filesRequest?.filesPost?.postFiles;
const getFiles = handleAPIFunctioning?.filesRequest?.filesGet?.getFiles;
const postFilesNumber =
    handleAPIFunctioning?.filesRequest?.filesPost?.postFilesNumber;
const getFilesNumber =
    handleAPIFunctioning?.filesRequest.filesGet.getFilesNumber;
const routeNumber = handleAPIFunctioning?.routeNumber;
const activeRoutes = { post: null, get: null };

/* --------------------------------- content -------------------------------- */

// print the path object returned in "getAllPaths.js"

console.dir(handleAPIFunctioning, { depth: null });

// review api system
const handlePostFiles = () => {
    for (let p = 0; p < postFilesNumber; p++) {
        try {
            const postRouteHandler = require(rawFilesPost[p]);
            const convertedPathFilePost = format.liveRemoveFileName(
                postFiles[p],
                jsonConfig.post_route_file_format /* post.route.js */,
                ""
            );

            app.post(convertedPathFilePost, postRouteHandler);
        } catch (error) {
            console.log(`[!] Specific error detected : ${error}`);
            process.exit(1);
        }
    }
};
const handleGetFiles = () => {
    for (let g = 0; g < getFilesNumber; g++) {
        try {
            const getRouteHandler = require(rawFilesGet[g]);

            const convertedPathFileGet = format.liveRemoveFileName(
                getFiles[g],
                jsonConfig.get_route_file_format,
                ""
            );
            app.get(convertedPathFileGet, getRouteHandler);
        } catch (error) {
            console.log(`[!] Error while loading GET route: ${error}`);
            process.exit(1);
        }
    }
};

module.exports = {
    handleGetFiles,
    handlePostFiles,
    activeRoutes,
    routeNumber,
    app,
    postFiles,
    getFiles,
};
