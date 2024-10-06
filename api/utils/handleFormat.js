class Format {
    // <3
    livePath(fileOrPath) {
        return fileOrPath.split("..").pop().replaceAll("\\", "/");
    }
    liveFile(fileOrPath) {
        return fileOrPath.split("\\").pop().slice(0, -3);
    }
    files(fileOrPath) {
        let tempArray = [];
        fileOrPath.forEach((element) => {
            tempArray.push(element.split("\\").pop().slice(0, -3));
        });
        return tempArray;
    }
    paths(fileOrPath) {
        let tempArray = [];
        fileOrPath.forEach((element) => {
            tempArray.push(element.split("..").pop().replaceAll("\\", "/"));
        });
        return tempArray;
    }
    liveRemoveFileName(fileOrPath, charReplace, charReplaced) {
        return fileOrPath.replace(charReplace, charReplaced);
    }
}
module.exports = Format;
