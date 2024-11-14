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
        outgoingObj.label = formatPkg.odds || "no_odds";
    } else if (labelType == "ROLL") {
        outgoingObj.label = roll.toString();
    };

    return outgoingObj
}

// TO DUMP
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
                            if (labelType == "ODDS") {
                                amountText = "<amount>"
                                diceRollName = "<roll>"
                            };

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
/////////

// MIGHT DRY IT UP, MAYBE
function generateAmount(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.amountBetNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name, loggit)

        gameElements.amountBetPhrases.forEach(betPhrase => {
            logThis("Bet Phrase " + betPhrase, loggit);

            var hasAmount = betPhrase.includes("<amount>");

            if (betPhrase.includes("<betNickname>") && !betNamePkg.nickname) return
            
            betPhrase = betPhrase
                .replace("<betName>", betNamePkg.name)
                .replace("<betNickname>", betNamePkg.nickname);

            if (!hasAmount) {
                jsonToGo.push({
                    "text": betPhrase,
                    "label": "<no_amount>"
                });
            } else {
                for (let i = 1; i <= 100; i++) {
                    var cleanedBetPhrase = betPhrase.replace("<amount>", "$" + i);

                    jsonToGo.push({
                        "text": cleanedBetPhrase,
                        "label": i.toString()
                    });
                };
            };
        });
    });

    return jsonToGo;
};

function generateRoll(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.amountBetNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name, loggit)

        gameElements.rollBetPhrases.forEach(betPhrase => {
            logThis("Bet Phrase " + betPhrase, loggit);
            var hasAmount = betPhrase.includes("_roll_");

            if (betPhrase.includes("_betNickname_") && !betNamePkg.nickname) return
            
            betPhrase = betPhrase
                .replace("_betName_", betNamePkg.name)
                .replace("_betNickname_", betNamePkg.nickname);

            if (!hasAmount) {
                jsonToGo.push({
                    "text": betPhrase,
                    "label": "<no_roll>"
                });
            } else {
                for (let i = 2; i <= 12; i++) {
                    var cleanedBetPhrase = betPhrase.replace("_roll_", i);

                    jsonToGo.push({
                        "text": cleanedBetPhrase,
                        "label": i.toString()
                    });
                };
            };
        });
    });

    return jsonToGo;
};

function logThis(log, loggit) {
    if (loggit) {
        console.log(loggit, log);
    }
};


module.exports.generate = generate;
module.exports.generateAmount = generateAmount;
module.exports.generateRoll = generateRoll;