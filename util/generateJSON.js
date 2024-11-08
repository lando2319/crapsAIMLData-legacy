var lineFormatter = require('./lineFormatter.js');

// might need to get more clever if I go over 10
function wordToNumber(word) {
    const numbers = {
        "one dollar": 1,
        "two dollar": 2,
        "three dollar": 3,
        "four dollar": 4,
        "five dollar": 5,
        "six dollar": 6,
        "seven dollar": 7,
        "eight dollar": 8,
        "nine dollar": 9,
        "ten dollar": 10
    };

    return numbers[word.toLowerCase()] ?? word;
}

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
                        betNamePkg.amounts.forEach(amountText => {
                            var formattedPhrase = lineFormatter.formatLine(betPhrase, betNamePkg, diceRollName, amountText);

                            var amountWithoutDollarSign = amountText.replace("$", "");
                            var formattedAmount = wordToNumber(amountWithoutDollarSign);

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