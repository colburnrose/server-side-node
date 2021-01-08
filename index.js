const fs = require("fs");

const contents = fs.readdirSync("./animals");

console.log(contents);
