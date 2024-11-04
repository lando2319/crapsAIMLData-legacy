var lineFormatter = require('./lineFormatter.js');

function generate(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.betNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name)

        gameElements.betPhrases.forEach(betPhrase => {
            logThis("Bet Phrase " + betPhrase);

            var hasAmount = betPhrase.includes("_amount_");
            var amount = "";

            if (hasAmount) {
                amount = "$5";
            };

            gameElements.diceRolls.forEach(diceRollPkg => {
                logThis("Dice Roll " + diceRollPkg.name);

                // GET THIS WORKING AGAIN
                // var allName = diceRollPkg.aliases;
                // allName.push(diceRollPkg.name);

                var allName = [diceRollPkg.name];

                allName.forEach(diceRollName => {

                    var formattedPhrase = lineFormatter.formatLine(betPhrase, betNamePkg, diceRollName);

                    var formattedAmount = amount.replace("$", "");

                    console.log("ADDING THIS LINE");
                    console.log(formattedPhrase);
                    jsonToGo.push({
                        "text": formattedPhrase,
                        "label": betNamePkg.slug + "_" + formattedAmount + "_" + diceRollPkg.number
                    });
                });
            });
        });
    });

    function logThis(log) {
        if (loggit) {
            console.log(loggit, log);
        }
    };

    return jsonToGo;
};

module.exports.generate = generate;