const fs = require("fs");
const path = require("path");

function getAllSubdirectories(dirPath) {
    const subdirectories = [];

    function exploreDirectory(currentPath) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            console.log(fullPath);

            if (entry.isDirectory()) {
                subdirectories.push(fullPath);
                exploreDirectory(fullPath);
            }
        }
    }

    exploreDirectory(dirPath);
    return subdirectories;
}

// Exemple d'utilisation
const directoryPath = "./src";
const subdirectories = getAllSubdirectories(directoryPath);
console.log(subdirectories);
