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

                var allNames = JSON.parse(JSON.stringify(diceRollPkg.aliases));
                allNames.push(diceRollPkg.name);

                allNames.forEach(diceRollName => {

                    var formattedPhrase = lineFormatter.formatLine(betPhrase, betNamePkg, diceRollName);

                    var formattedAmount = amount.replace("$", "");

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