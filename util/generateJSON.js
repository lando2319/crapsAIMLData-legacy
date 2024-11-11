var lineFormatter = require('./lineFormatter.js');


function generateLabelSlug(labelType, formatPkg, roll) {
    var outgoingObj = {
        text: formatPkg.phrase,
        label: ""
    };

    if (labelType == "BET") {
        outgoingObj.label = formatPkg.bet;
    } else if (labelType == "AMOUNT") {
        outgoingObj.label = formatPkg.amount;
    } else if (labelType == "ODDS") {
        outgoingObj.label = formatPkg.odds;
    } else if (labelType == "ROLL") {
        outgoingObj.label = roll.toString();
    };

    return outgoingObj
}

function generate(gameElements, labelType, loggit) {
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
                        var formatPkg = lineFormatter.process(betPhrase, betNamePkg, diceRollName, "", "");
                        var jsonObj = generateLabelSlug(labelType, formatPkg, diceRollPkg.number);

                        jsonToGo.push(jsonObj);
                    } else {
                        betNamePkg.amounts.forEach(amountText => {
                            if (betNamePkg.odds && betPhrase.includes("_odds_")){
                                betNamePkg.odds.forEach(oddsAmount => {

                                    var formatPkg = lineFormatter.process(betPhrase, betNamePkg, diceRollName, amountText, oddsAmount);
                                    var jsonObj = generateLabelSlug(labelType, formatPkg, diceRollPkg.number);

                                    jsonToGo.push(jsonObj);
                                })
                            } else {
                                var formatPkg = lineFormatter.process(betPhrase, betNamePkg, diceRollName, amountText, "");
                                var jsonObj = generateLabelSlug(labelType, formatPkg, diceRollPkg.number);

                                jsonToGo.push(jsonObj);
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