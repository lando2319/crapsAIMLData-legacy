
const fs = require("fs");

var generateJSON = require("./util/generateJSON.js");
var gameElements = require('./util/gameElements.js');

(async () => {
    var loggit = "generateJSON"
    try {

        console.log(loggit, "Generating Training Data for Bet Names");
        var jsonToGo = generateJSON.generatePromptTypes(gameElements, loggit);
        
        console.log(loggit, "Generating File promptTypesTrainingData.json")
        await fs.promises.writeFile("./data/promptTypesTrainingData.json", JSON.stringify(jsonToGo, null, 2));

        console.log(loggit, "Successfully Generated File promptTypesTrainingData.json")

        process.exit(0);
    } catch (err) {
        console.log(loggit, "ERROR", err);
        process.exit(1);
    };
})();