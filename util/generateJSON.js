
function generateBetNamesForWordTagging(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.betNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name, loggit)

        jsonToGo.push({
            "text": betNamePkg.name.toUpperCase(),
            "label": betNamePkg.slug
        });
    });

    gameElements.nonBets.forEach(nonBet => {
        jsonToGo.push({
            "text": nonBet.toUpperCase(),
            "label": "no_bet"
        });
    });

    return jsonToGo;
};

function logThis(log, loggit) {
    if (loggit) {
        console.log(loggit, log);
    }
};

const waysToMake = {
    4:[[1,3], [2,2]],
    5:[[1,4], [2,3]],
    6:[[1,5], [2,4], [3,3]],
    7:[[1,6], [2,5], [3,4]],
    8:[[2,6], [3,5], [4,4]],
    9:[[3,6], [4,5]],
    10:[[4,6]]
}

function generateWordTagging(gameElements, loggit) {
    const jsonToGo = [];

    gameElements.betPhrases.forEach((betPhraseTemplate) => {
        betPhraseTemplate = betPhraseTemplate.toUpperCase();
        logThis(`Processing Bet Phrase Template: ${betPhraseTemplate}`, loggit);

        gameElements.betNames.forEach((betNamePkg) => {
            // might want to dump this in favor of aliases
            if (betPhraseTemplate.includes("_BETNICKNAME_") && !betNamePkg.nickname) return;

            var isLineBet = (betNamePkg.name == "Pass Line Bet" || betNamePkg.name == "Don't Pass Bet");

            if (betPhraseTemplate.includes("_POINT_") && !isLineBet) {
                return
            };

            var isHop = betNamePkg.name.includes("Hopping");

            for (let roll = 2; roll <= 12; roll++) {
                let amounts = [
                    "$" + betNamePkg.min, 
                    "$" + betNamePkg.min * 2, 
                    "$" + betNamePkg.min * 3,
                    betNamePkg.min + " DOLLARS", 
                    (betNamePkg.min * 2) + " DOLLARS", 
                    (betNamePkg.min * 3) + " DOLLARS"
                ];

                amounts.forEach((betAmount) => {
                    if (betPhraseTemplate.includes("_DIE1_")) {
                        if (isHop && roll > 3 && roll < 11) {
                            waysToMake[roll].forEach(wayToMake => {
                                var entry = genearateTokensAndLabels(
                                    betPhraseTemplate,
                                    betNamePkg.name,
                                    betAmount,
                                    "",
                                    roll,
                                    wayToMake[0],
                                    wayToMake[1],
                                    0
                                );
                                jsonToGo.push(entry);
                            });
                        }
                    } else if (betPhraseTemplate.includes("_POINT_") && isLineBet) {
                        ["4", "5", "6", "8", "9", "10"].forEach(point => {
                            applyOdds(betPhraseTemplate, betNamePkg, betAmount, roll, point, jsonToGo);
                        })
                    } else {
                        applyOdds(betPhraseTemplate, betNamePkg, betAmount, roll, "", jsonToGo);
                    }
                });
            }
        });
    });

    return jsonToGo;
}

function applyOdds(betPhraseTemplate, betNamePkg, betAmount, roll, point, jsonToGo) {
    if (betPhraseTemplate.includes("_ODDS_") && betNamePkg.hasOdds) {
        ["$10", "$20", "$30"].forEach((oddsAmount) => {
            var entry = genearateTokensAndLabels(
                betPhraseTemplate,
                betNamePkg.name,
                betAmount,
                oddsAmount,
                roll,
                0,
                0,
                point
            );
            jsonToGo.push(entry);
        });
    } else {
        var entry = genearateTokensAndLabels(
            betPhraseTemplate,
            betNamePkg.name,
            betAmount,
            "",
            roll,
            0,
            0,
            point
        );
        jsonToGo.push(entry);
    }

}


function genearateTokensAndLabels(incomingPhrase, betName, betAmount, oddsAmount, roll, die1, die2, point) {
    const betNameTokens = betName.split(/\s+/);
    const oddsTokens = oddsAmount.split(/\s+/);
    const amountTokens = betAmount.split(/\s+/);

    if (incomingPhrase.includes("_ODDS_") && oddsAmount) {
        incomingPhrase = incomingPhrase.replace("_ODDS_", "WITH _ODDS_ ODDS")
    } else {
        incomingPhrase = incomingPhrase.replace("_ODDS_", "")
    };

    const tokensBeforInterplation = incomingPhrase.split(/\s+/).filter(Boolean);

    let betAmountAsNumber = betAmount.replace(/\D/g, '');
    let oddsAmountAsNumber = oddsAmount.replace(/\D/g, '');

    var labels = [];
    var tokens = [];

    tokensBeforInterplation.forEach((token, index) => {
        if (token == "_AMOUNT_") {
            amountTokens.forEach(amountToken => {
                if (amountToken == betAmountAsNumber || amountToken == "$" + betAmountAsNumber) {
                    labels.push("AMOUNT");
                } else {
                    labels.push("NONE");
                }

                tokens.push(amountToken);
            });
        } else if (token == "_BETNAME_") {
            betNameTokens.forEach(betNameToken => {
                labels.push("BET_NAME");
                tokens.push(betNameToken.toUpperCase());
            });
        } else if (token == "_ODDS_" && oddsAmount) {
            oddsTokens.forEach(oddsToken => {
                if (oddsToken == oddsAmountAsNumber || oddsToken == "$" + oddsAmountAsNumber) {
                    labels.push("ODDS");
                } else {
                    labels.push("NONE");
                }

                tokens.push(oddsToken);
            });
        } else if (token == "_ROLL_") {
            labels.push("ROLL");
            tokens.push(roll.toString());
        } else if (token == "_POINT_") {
            labels.push("POINT");
            tokens.push(point);
        } else if (token == "_DIE1_") {
            labels.push("DIE");
            tokens.push(die1.toString());
        } else if (token == "_DIE2_") {
            labels.push("DIE");
            tokens.push(die2.toString());
        } else {
            labels.push("NONE");
            tokens.push(token);
        }
    });

    return {
        tokens: tokens,
        labels: labels,
    }
};

module.exports.genearateTokensAndLabels = genearateTokensAndLabels
module.exports.generateWordTagging = generateWordTagging
module.exports.generateBetNamesForWordTagging = generateBetNamesForWordTagging;