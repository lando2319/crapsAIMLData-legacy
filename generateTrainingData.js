
const fs = require("fs");

var generateJSON = require("./util/generateJSON.js");
var gameElements = require('./util/gameElements.js');

(async () => {
    var loggit = "generateJSON"
    try {

        console.log(loggit, "Generating Training Data");

        var jsonToGo = generateJSON.generate(gameElements, loggit);

        
        gameElements.extraTrainingData.forEach(trainingData => {
            jsonToGo.push(trainingData);
        })

        console.log(loggit, "Generating File trainingData.json")
        await fs.promises.writeFile("./data/trainingData.json", JSON.stringify(jsonToGo, null, 2));

        console.log(loggit, "Successfully Generated File trainingData.json")

        var validationGameElements = JSON.parse(JSON.stringify(gameElements));
        validationGameElements.betPhrases = validationGameElements.validationBetPhrases;

        var validationJSON = generateJSON.generate(validationGameElements, loggit);

        console.log(loggit, "Generating File validationData.json")
        await fs.promises.writeFile("./data/validationData.json", JSON.stringify(validationJSON, null, 2));

        console.log(loggit, "Successfully Generated File validationData.json")
        process.exit(0);
    } catch (err) {
        console.log(loggit, "ERROR", err);
        process.exit(1);
    };
})();