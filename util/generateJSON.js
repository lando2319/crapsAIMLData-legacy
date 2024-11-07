var lineFormatter = require('./lineFormatter.js');

function generate(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.betNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name)

        gameElements.betPhrases.forEach(betPhrase => {
            logThis("Bet Phrase " + betPhrase);

            var hasAmount = betPhrase.includes("_amount_");

            gameElements.diceRolls.forEach(diceRollPkg => {
                logThis("Dice Roll " + diceRollPkg.name);

                var allNames = JSON.parse(JSON.stringify(diceRollPkg.aliases));
                allNames.push(diceRollPkg.name);
                allNames.push(diceRollPkg.number);

                allNames.forEach(diceRollName => {

                    if (!hasAmount) {
                        var formattedPhrase = lineFormatter.formatLine(betPhrase, betNamePkg, diceRollName, "");

                        jsonToGo.push({
                            "text": formattedPhrase,
                            "label": betNamePkg.slug + "__" + diceRollPkg.number
                        });
                    } else {
                        ["$5", "Five Dollar"].forEach(amountText => {
                            var formattedPhrase = lineFormatter.formatLine(betPhrase, betNamePkg, diceRollName, amountText);

                            var formattedAmount = amountText.replace("$", "").replace("Five Dollar", "5");

                            jsonToGo.push({
                                "text": formattedPhrase,
                                "label": betNamePkg.slug + "_" + formattedAmount + "_" + diceRollPkg.number
                            });
                        });
                    };
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