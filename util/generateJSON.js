var lineFormatter = require('./lineFormatter.js');

function generate(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.betNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name)

        gameElements.betPhrases.forEach(betPhrase => {
            logThis("Bet Phrase " + betPhrase);

            var hasAmount = betPhrase.includes("_amount_");

            if (betPhrase.includes("_betNickname_") && !betNamePkg.nickname) return

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
                        betNamePkg.amounts.forEach(amountText => {
                            if (betNamePkg.odds && betPhrase.includes("_odds_")){
                                betNamePkg.odds.forEach(oddsAmount => {

                                    var formatPkg = lineFormatter.process(betPhrase, betNamePkg, diceRollName, amountText, oddsAmount);

                                    jsonToGo.push({
                                        "text": formatPkg.phrase,
                                        "label": betNamePkg.slug + "_" + formatPkg.amount + "_" + formatPkg.odds + "_" + diceRollPkg.number
                                    });
                                })
                            } else {
                                var formatPkg = lineFormatter.process(betPhrase, betNamePkg, diceRollName, amountText, "");
                                jsonToGo.push({
                                    "text": formatPkg.phrase,
                                    "label": betNamePkg.slug + "_" + formatPkg.amount + "_" + diceRollPkg.number
                                });
                            };
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