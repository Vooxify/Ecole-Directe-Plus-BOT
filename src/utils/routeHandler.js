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
 * this function saves all code
 * it ensures that "routeHandler.js" is executed in the utils folder,
 * not in the base path, avoiding the need for "../" in path resolution
 */
process.chdir(__dirname);

/* ------------------------------- statics var ------------------------------ */

const handleAPIFunctioning = getAllPaths(
    jsonConfig.api_routes_path,
    jsonConfig.excluded_routes,
    jsonConfig.excluded_files
); // object with unified paths and files

// Uncomment these lines if you want to use datas...

// const outPath = handleAPIFunctioning?.outPath;
// const rawOutPath = handleAPIFunctioning?.rawOutPath;
const rawFiles = handleAPIFunctioning?.rawFiles;
const files = handleAPIFunctioning?.files;
const fileNumber = handleAPIFunctioning?.fileNumber;
const routeNumber = handleAPIFunctioning?.routeNumber;
const activeRoutes = [];

/* --------------------------------- content -------------------------------- */

// print the path object returned in "getAllPaths.js"
console.dir(handleAPIFunctioning, { depth: null });

// Review API system
const handleFiles = () => {
    for (let i = 0; i < fileNumber; i++) {
        try {
            const routeHandler = require(rawFiles[i]);

            const convertedPathFile = format.liveRemoveFileName(
                files[i],
                jsonConfig.route_file_format, // dynamic based on your config
                ""
            );

            app.use(convertedPathFile, routeHandler);
            const routes = files.map((element) =>
                format.liveRemoveFileName(
                    element,
                    jsonConfig.route_file_format,
                    ""
                )
            );
            activeRoutes.push(routes);
        } catch (error) {
            console.log(`[!] Specific error detected : ${error}`);
            process.exit(1);
        }
    }
};

module.exports = {
    handleFiles,
    activeRoutes,
    routeNumber,
    app,
    files,
};
