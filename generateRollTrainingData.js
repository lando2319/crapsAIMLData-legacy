
const fs = require("fs");

var generateJSON = require("./util/generateJSON.js");
var gameElements = require('./util/gameElements.js');

(async () => {
    var loggit = "generateJSON"
    try {

        console.log(loggit, "Generating Roll Training Data");
        var jsonToGo = generateJSON.generateRoll(gameElements, loggit);
        
        console.log(loggit, "Generating File rollTrainingData.json")
        await fs.promises.writeFile("./data/rollTrainingData.json", JSON.stringify(jsonToGo, null, 2));

        console.log(loggit, "Successfully Generated File rollTrainingData.json")

        process.exit(0);
    } catch (err) {
        console.log(loggit, "ERROR", err);
        process.exit(1);
    };
})();