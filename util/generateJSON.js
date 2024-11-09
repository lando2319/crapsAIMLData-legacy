var lineFormatter = require('./lineFormatter.js');

function wordToNumber(word) {
    const units = {
        "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
        "six": 6, "seven": 7, "eight": 8, "nine": 9
    };
    const teens = {
        "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, 
        "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18, "nineteen": 19
    };
    const tens = {
        "ten": 10, "twenty": 20, "thirty": 30, "forty": 40,
        "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90
    };
    
    const phrase = word.toLowerCase().replace(" dollars", "").replace(" dollar", "");

    if (tens[phrase]) return tens[phrase];
    if (teens[phrase]) return teens[phrase];

    const parts = phrase.split("-");
    if (parts.length === 2 && tens[parts[0]] && units[parts[1]]) {
        return tens[parts[0]] + units[parts[1]];
    }

    if (units[phrase]) return units[phrase];

    return word;
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