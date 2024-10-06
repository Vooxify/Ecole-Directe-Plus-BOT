const fs = require("fs");
const path = require("path");
const Format = require("./handleFormat");

module.exports = (
    dirPath,
    excludedDirs = [],
    excludedFiles = [],
    dirOnly = true,
    printExcludedFilesAndPaths = true
) => {
    // const
    const outPath = [];
    const rawOutPath = [];
    const outFilesPath = [];
    const rawGetFiles = [];
    const rawPostFiles = [];
    const excludedRouteFiles = [];
    // functions

    // utils

    const format = new Format();

    const exploreDirectory = (currentPath) => {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = `${path.join(currentPath, entry.name)}`;

            const routeConverted = format.livePath(fullPath);
            // convert paths/future route
            // ex --> ..\\api\\utils --> /api/utils

            if (entry.isDirectory()) {
                if (excludedDirs.includes(routeConverted)) {
                    printExcludedFilesAndPaths
                        ? console.log(
                              // use ternary to manage prints to not have a lot of after calling the function many times
                              `[+] An excluded dir was detected at "${routeConverted}"` // to change this --> edit in function call params
                          )
                        : null;
                } else {
                    outPath.push(routeConverted);
                    rawOutPath.push(fullPath);
                    exploreDirectory(fullPath); // call the function to explore under directories (pay attention !!)
                }
            }

            if (entry.isFile()) {
                const routeFile = fullPath.split("\\").pop().slice(0, -3);
                if (
                    format.liveFile(fullPath).split(".")[0] === "get" // i use format for lisibility

                    /* this/is/full/path/get.file.js -> ["get"] */
                ) {
                    rawGetFiles.push(fullPath);
                }
                if (format.liveFile(fullPath).split(".")[0] === "post") {
                    rawPostFiles.push(fullPath);
                }
                if (
                    (routeFile.trim().startsWith("[") &&
                        routeFile.trim().endsWith("]")) ||
                    excludedFiles.includes(`${routeFile}.js`) // :-)
                ) {
                    // get filename without path and extention
                    // ..\hello\testHello\[testfile2].js --> [testfile2]

                    // most simple to call function but this is little useless
                    printExcludedFilesAndPaths
                        ? console.log(
                              `[+] An excluded file "${routeFile}.js" was detected : "${routeConverted}"` // to change this --> edit filename
                          )
                        : null;
                } else {
                    outFilesPath.push(routeFile); // push if note enclosed
                }
            }
        }
    };

    exploreDirectory(dirPath);
    const rawFiles = [...rawPostFiles, ...rawGetFiles];
    // getFiles.raw =
    return dirOnly
        ? {
              outPath: outPath, // outPath is converted in the reading process
              rawOutPath: rawOutPath,
              rawFiles: rawFiles,
              filesRequest: {
                  filesPost: {
                      rawPostFiles: rawPostFiles,
                      postFiles: format.paths(rawPostFiles),
                      postFilesNumber: rawPostFiles.length,
                  },
                  filesGet: {
                      rawGetFiles: rawGetFiles,
                      getFiles: format.paths(rawGetFiles),
                      getFilesNumber: rawGetFiles.length,
                  },
              },
              routeNumber: rawFiles.length,
          }
        : outFilesPath.sort(); // use sort() to sort alphabetically
};
