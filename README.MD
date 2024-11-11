# Craps AI Training Data

npm file for generating file for training data and the latest training data

`node generateTrainingData.js`



TODO Test cases
`"text": "If a Twelve is rolled, does a the Field Bet pay double?",`

### hold this code

This validation data code was removed from generateTrainingData since we're doing auto for now

// Validation data turned off
// var validationGameElements = JSON.parse(JSON.stringify(gameElements));
// validationGameElements.betPhrases = validationGameElements.validationBetPhrases;

// var validationJSON = generateJSON.generate(validationGameElements, loggit);

// console.log(loggit, "Generating File validationData.json")
// await fs.promises.writeFile("./data/validationData.json", JSON.stringify(validationJSON, null, 2));

// console.log(loggit, "Successfully Generated File validationData.json")




        // Turn this off for now, trying multiple models
        // gameElements.extraTrainingData.forEach(trainingData => {
        //     jsonToGo.push(trainingData);
        // })