
function generateBetNamesForWordTagging(gameElements, loggit) {
    var jsonToGo = [];

    gameElements.betNames.forEach(betNamePkg => {
        logThis("Generating for " + betNamePkg.name, loggit)

        jsonToGo.push({
            "text": betNamePkg.name,
            "label": betNamePkg.slug
        });

        jsonToGo.push({
            "text": betNamePkg.name.toLowerCase(),
            "label": betNamePkg.slug
        });

    });

    gameElements.nonBets.forEach(nonBet => {
        jsonToGo.push({
            "text": nonBet,
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

function generateWordTagging(gameElements, loggit) {
    const jsonToGo = [];

    gameElements.betPhrases.forEach((betPhraseTemplate) => {
        logThis(`Processing Bet Phrase Template: ${betPhraseTemplate}`, loggit);

        gameElements.betNames.forEach((betNamePkg) => {
            if (betPhraseTemplate.includes("_betNickname_") && !betNamePkg.nickname) return;

            let betPhraseReplaced = betPhraseTemplate
                .replace("_betName_", ` ${betNamePkg.name} `)
                .replace("_betNickname_", ` ${betNamePkg.nickname || ""} `);

            for (let roll = 2; roll <= 12; roll++) {
                const betPhraseWithRoll = betPhraseReplaced.replace("_roll_", ` ${roll} `);

                ["$5", "$10", "$15"].forEach((betAmount) => {
                    const betPhraseWithAmount = betPhraseWithRoll.replace("_amount_", ` ${betAmount} `);

                    ["$10", "$20", "$30"].forEach((oddsAmount) => {
                        const cleanedBetPhrase = betPhraseWithAmount.replace("_odds_", ` with ${oddsAmount} odds `);

                        const tokens = cleanedBetPhrase.split(/\s+/).filter(Boolean);
                        const betNameTokens = betNamePkg.name.split(/\s+/);

                        const labels = Array(tokens.length).fill("NONE");

                        tokens.forEach((_, index) => {
                            // Match multi-word BET_NAME
                            if (
                                index + betNameTokens.length <= tokens.length &&
                                betNameTokens.every((word, i) => tokens[index + i] === word)
                            ) {
                                for (let i = 0; i < betNameTokens.length; i++) {
                                    labels[index + i] = "BET_NAME";
                                }
                            }
                        });

                        // Assign other labels
                        tokens.forEach((token, index) => {
                            if (labels[index] === "NONE") {
                                if (token === roll.toString()) labels[index] = "ROLL";
                                else if (token === betAmount) labels[index] = "AMOUNT";
                                else if (token === `${oddsAmount}`) labels[index] = "ODDS";
                            }
                        });

                        jsonToGo.push({
                            tokens: tokens,
                            labels: labels,
                        });
                    });
                });
            }
        });
    });

    return jsonToGo;
}


module.exports.generateWordTagging = generateWordTagging
module.exports.generateBetNamesForWordTagging = generateBetNamesForWordTagging;