
const fs = require("fs");

var generateJSON = require("./util/generateJSON.js");
var gameElements = require('./util/gameElements.js');

(async () => {
    var loggit = "generateJSON"
    try {

        console.log(loggit, "Generating Training Data for BET");

        var jsonToGo = generateJSON.generate(gameElements, "BET", loggit);
        
        console.log(loggit, "Generating File betTrainingData.json")
        await fs.promises.writeFile("./data/betTrainingData.json", JSON.stringify(jsonToGo, null, 2));

        console.log(loggit, "Successfully Generated File betTrainingData.json")


        console.log(loggit, "Generating Training Data for AMOUNT");
        var jsonToGo = generateJSON.generate(gameElements, "AMOUNT", loggit);
        
        console.log(loggit, "Generating File amountTrainingData.json")
        await fs.promises.writeFile("./data/amountTrainingData.json", JSON.stringify(jsonToGo, null, 2));

        console.log(loggit, "Successfully Generated File amountTrainingData.json")


        console.log(loggit, "Generating Training Data for ODDS");
        var jsonToGo = generateJSON.generate(gameElements, "ODDS", loggit);
        
        console.log(loggit, "Generating File oddsTrainingData.json")
        await fs.promises.writeFile("./data/oddsTrainingData.json", JSON.stringify(jsonToGo, null, 2));

        console.log(loggit, "Successfully Generated File oddsTrainingData.json")


        console.log(loggit, "Generating Training Data for ROLL");
        var jsonToGo = generateJSON.generate(gameElements, "ROLL", loggit);

        console.log(loggit, "Generating File rollTrainingData.json")
        await fs.promises.writeFile("./data/rollTrainingData.json", JSON.stringify(jsonToGo, null, 2));

        console.log(loggit, "Successfully Generated File rollTrainingData.json")

        process.exit(0);
    } catch (err) {
        console.log(loggit, "ERROR", err);
        process.exit(1);
    };
})();