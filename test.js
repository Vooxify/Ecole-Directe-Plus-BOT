const fs = require("fs");

// Fonction pour vérifier si le contenu du fichier est encadré par des crochets
function isFileEnclosedInBrackets(filePath) {
    // Lire le contenu du fichier
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Vérifier si le premier caractère est '[' et le dernier caractère est ']'
    const isEnclosed =
        fileContent.trim().startsWith("[") && fileContent.trim().endsWith("]");

    return isEnclosed;
}

// Exemple d'utilisation
const filePath = "./test.txt";
const result = isFileEnclosedInBrackets(filePath);

if (result) {
    console.log("Le fichier est encadré par des crochets.");
} else {
    console.log("Le fichier n'est pas encadré par des crochets.");
}
