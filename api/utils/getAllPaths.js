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

    function exploreDirectory(currentPath) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = `${path.join(currentPath, entry.name)}`;
            const routeConverted = fullPath
                .split("..")
                .pop()
                .replaceAll("\\", "/");

            if (entry.isDirectory()) {
                if (excludedDirs.includes(routeConverted)) {
                    console.log(
                        `[+] An excluded dir was detected ! "${routeConverted}"`
                    );
                } else {
                    outPath.push(routeConverted);
                    exploreDirectory(fullPath);
                }
            }

            if (entry.isFile()) {
                const endRoute = fullPath
                    .split("\\")
                    .pop()
                    .split(".")
                    .slice(-2, -1)[0]; // Get just the file name, without path and extention
                outFilesPath.push(endRoute);
            }
        }
    }

    exploreDirectory(dirPath);

    return dirOnly ? outPath : outFilesPath;
};
