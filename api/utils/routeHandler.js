/* --------------------------------- modules -------------------------------- */

const path = require("path");
const fs = require("fs");
const express = require("express");
require("dotenv").config({ path: "../../.env" });

/* ---------------------------------- files --------------------------------- */

const getAllPaths = require("./getAllPaths");
const Format = require("./handleFormat");

const format = new Format();

/* ------------------------------- statics var ------------------------------ */

const app = express();
app.use(express.json());
const apiPath = "../";
const PORT = process.env.PORT;
const BRAND = `


_______  ______   _______    _______  _______  ___ 
|       ||      | |       |  |   _   ||       ||   |
|    ___||  _    ||    _  |  |  |_|  ||    _  ||   |
|   |___ | | |   ||   |_| |  |       ||   |_| ||   |
|    ___|| |_|   ||    ___|  |       ||    ___||   |
|   |___ |       ||   |      |   _   ||   |    |   |
|_______||______| |___|      |__| |__||___|    |___|

                                                                                   
`;

/* -------------------------------- functions ------------------------------- */
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
/* --------------------------------- content -------------------------------- */

const handleAPIFunctioning = getAllPaths(
    apiPath,
    ["/create_user", "/visits"],
    ["index.js"]
); // object with 2 different paths

const outPath = handleAPIFunctioning?.outPath;
const rawOutPath = handleAPIFunctioning?.rawOutPath;
const rawFiles = handleAPIFunctioning?.rawFiles;
const rawFilesPost =
    handleAPIFunctioning?.filesRequest?.filesPost?.rawPostFiles;
const rawFilesGet = handleAPIFunctioning?.filesRequest?.filesGet?.rawGetFiles;
const postFiles = handleAPIFunctioning?.filesRequest?.filesPost?.postFiles;
const getFiles = handleAPIFunctioning?.filesRequest?.filesGet?.getFiles;
const routeNumber = handleAPIFunctioning?.routeNumber;
const postFilesNumber =
    handleAPIFunctioning?.filesRequest?.filesPost?.postFilesNumber;
const getFilesNumber =
    handleAPIFunctioning?.filesRequest.filesGet.getFilesNumber;
const activeRoutes = { post: null, get: null };

// console.dir(handleAPIFunctioning, { depth: null });

// review api system
const handlePostFiles = () => {
    for (let p = 0; p < postFilesNumber; p++) {
        // console.log(postFiles[p]);
        try {
            const postRouteHandler = require(rawFilesPost[p]);
            const convertedPathFilePost = format.liveRemoveFileName(
                postFiles[p],
                "post.route.js",
                ""
            );
            activeRoutes.post = convertedPathFilePost; // add this to see witch routes are actives
            app.post(convertedPathFilePost, postRouteHandler);
        } catch (error) {
            console.log(`[!] An error was occured : ${error}\n\nLeaving...`);
            process.exit();
        }
    }
};

const handleGetFiles = () => {
    for (let g = 0; g < getFilesNumber; g++) {
        try {
            const getRouteHandler = require(rawFilesGet[g]);
            const convertedPathFileGet = format.liveRemoveFileName(
                getFiles[g],
                "get.route.js",
                ""
            );
            activeRoutes.get = convertedPathFileGet; // add this to see witch routes are actives
            app.get(convertedPathFileGet, getRouteHandler);
        } catch (error) {
            console.log(`[!] An error was occured : ${error}\n\nLeaving...`);
            process.exit();
        }
    }
};

const runApi = async () => {
    await Promise.all([handleGetFiles(), handlePostFiles()]);
    const routes = [
        ...getFiles.map((element) =>
            format.liveRemoveFileName(element, "get.route.js", "")
        ),
        ...postFiles.map((element) =>
            format.liveRemoveFileName(element, "post.route.js", "")
        ),
    ];
    if (routes.length === 0) {
        console.log("[+] Any routes are registered");
    }
    for (const element of routes) {
        console.log(
            `[*] Enabled and active route : http://localhost:${PORT}${element}`
        );
        await sleep(700); // ms
    }
    await sleep(950);
    console.log(`[#] API is running at http://localhost:${PORT}`);
};

app.listen(PORT, async () => {
    console.log(BRAND);
    runApi();
});
