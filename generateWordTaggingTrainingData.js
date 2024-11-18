
const fs = require("fs");

var generateJSON = require("./util/generateJSON.js");
var gameElements = require('./util/gameElements.js');

(async () => {
    var loggit = "generateJSON"
    try {

        console.log(loggit, "Generating Word Tagging Training Data");
        var jsonToGo = generateJSON.generateWordTagging(gameElements, loggit);
        
        console.log(loggit, "Generating File wordTaggingTrainingData.json")
        await fs.promises.writeFile("./data/wordTaggingTrainingData.json", JSON.stringify(jsonToGo, null, 2));

        console.log(loggit, "Successfully Generated File wordTaggingTrainingData.json")

        process.exit(0);
    } catch (err) {
        console.log(loggit, "ERROR", err);
        process.exit(1);
    };
})();