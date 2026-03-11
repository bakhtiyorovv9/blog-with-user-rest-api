const fs = require("node:fs");

const readFile = (filePath) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        return data;
    } catch (err) {
        console.log("file not found");
    }
};

const writeFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    } catch (err) {
        console.log("error or write file");
    }
};

module.exports = {
    readFile,
    writeFile,
};
