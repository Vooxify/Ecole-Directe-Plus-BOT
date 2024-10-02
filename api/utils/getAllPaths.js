const fs = require("fs");
const path = require("path");

module.exports = (
    dirPath,
    excludedDirs = [],
    excludedFiles = [],
    dirOnly = true
) => {
    const outPath = [];
    const outFilesPath = [];
    const excludedRouteFiles = [];
    function exploreDirectory(currentPath) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = `${path.join(currentPath, entry.name)}`;

            const routeConverted = fullPath
                .split("..")
                .pop()
                .replaceAll("\\", "/");
            // convert paths/future route
            // ex --> ..\\api\\utils --> /api/utils

            if (entry.isDirectory()) {
                if (excludedDirs.includes(routeConverted)) {
                    console.log(
                        `[+] An excluded dir was detected at "${routeConverted}"` // to change this --> edit in function call params
                    );
                } else {
                    outPath.push(routeConverted);
                    exploreDirectory(fullPath); // call the function to explore under directories (pay attention !!)
                }
            }

            if (entry.isFile()) {
                // console.log(fullPath);
                const routeFile = fullPath.split("\\").pop().split(".").shift();
                // get filename without path and extention
                // ..\hello\testHello\[testfile2].js --> [testfile2]

                if (
                    (routeFile.trim().startsWith("[") &&
                        routeFile.trim().endsWith("]")) ||
                    excludedFiles.includes(`${routeFile}.js`) // :-)
                ) {
                    // most simple to call function but this is little useless
                    console.log(
                        `[+] An excluded file "${routeFile}.js" was detected : "${routeConverted}"` // to change this --> edit filename
                    );
                } else {
                    outFilesPath.push(routeFile); // push if note enclosed
                }
            }
        }
    }

    exploreDirectory(dirPath);

    return dirOnly ? outPath.sort() : outFilesPath.sort(); // use sort() to sort alphabetically
};
