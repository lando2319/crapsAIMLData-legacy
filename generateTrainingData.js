
const fs = require("fs");

var generateJSON = require("./util/generateJSON.js");

console.log("Generating Training Data");

var jsonToGo = generateJSON.generate();

console.log("FINAL JSON");
console.log(jsonToGo);

process.exit(0);