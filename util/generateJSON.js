
function generateAmount(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.cleanBetNames.forEach(betNamePkg => {
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

function generateOdds(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.cleanBetNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name, loggit)

        gameElements.oddsBetPhrases.forEach(betPhrase => {
            logThis("Bet Phrase " + betPhrase, loggit);

            var hasOddds = betPhrase.includes("_odds_");

            if (betPhrase.includes("_betNickname_") && !betNamePkg.nickname) return
            
            betPhrase = betPhrase
                .replace("_betName_", betNamePkg.name)
                .replace("_betNickname_", betNamePkg.nickname);

            if (!hasOddds) {
                jsonToGo.push({
                    "text": betPhrase,
                    "label": "no_odds"
                });
            } else {
                ["$5", "$10"].forEach(betAmount => {
                    var betPhraseWithAmount = betPhrase.replace("_amount_", betAmount);
                    for (let i = 1; i <= 100; i++) {
                        var cleanedBetPhrase = betPhraseWithAmount.replace("_odds_", " with $" + i + " odds");

                        jsonToGo.push({
                            "text": cleanedBetPhrase,
                            "label": i.toString()
                        });
                    };
                });
            };
        });
    });

    return jsonToGo;
};

function generateBetNames(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.betNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name, loggit)

        gameElements.betNamesBetPhrases.forEach(betPhrase => {
            logThis("Bet Phrase " + betPhrase, loggit);

            var hasName = betPhrase.includes("_betName_") || betPhrase.includes("_betNickname_");

            if (betPhrase.includes("_betNickname_") && !betNamePkg.nickname) return
            
            betPhrase = betPhrase
                .replace("_betName_", betNamePkg.name)
                .replace("_betNickname_", betNamePkg.nickname);

            if (!hasName) {
                jsonToGo.push({
                    "text": betPhrase,
                    "label": "no_bet"
                });
            } else {
                ["$5", "$10"].forEach(betAmount => {
                    var betPhraseWithAmount = betPhrase.replace("_amount_", betAmount);

                    ["$10", "$20"].forEach(oddsAmount => {
                        var cleanedBetPhrase = betPhraseWithAmount.replace("_odds_", " with " + oddsAmount + " odds");

                        jsonToGo.push({
                            "text": cleanedBetPhrase,
                            "label": betNamePkg.slug
                        });
                    })
                });
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

module.exports.generateBetNames = generateBetNames;
module.exports.generateAmount = generateAmount;
module.exports.generateRoll = generateRoll;
module.exports.generateOdds = generateOdds;