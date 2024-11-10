function formatLine(betPhrase, betNamePkg, diceRollName, betAmount, oddsAmount) {
    var formattedPhrase = betPhrase
        .replace("_amount_", betAmount) // expand with different betAmounts per betName
        .replace("_betName_", betNamePkg.name)
        .replace("_betNickname_", betNamePkg.nickname)
        .replace("_roll_", diceRollName)

    if (oddsAmount) {
        oddsAmount = "with " + oddsAmount + " odds";
    }

    formattedPhrase = formattedPhrase.replace("_odds_", oddsAmount);

    return formattedPhrase
};

function process(betPhrase, betNamePkg, diceRollName, betAmount, oddsAmount) {
    var formattedPhrase = formatLine(betPhrase, betNamePkg, diceRollName, betAmount, oddsAmount);

    var amountWithoutDollarSign = betAmount.replace("$", "");
    var formattedAmount = wordToNumber(amountWithoutDollarSign);

    var oddsWithoutDollarSign = oddsAmount.replace("$", "");
    var formattedOddsAmount = wordToNumber(oddsWithoutDollarSign);

    return {phrase:formattedPhrase, amount:formattedAmount, odds: formattedOddsAmount}
};

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
    
    const phrase = word.toLowerCase().replace(/\s*dollars?$/, "").trim();

    if (tens[phrase]) return tens[phrase];
    if (teens[phrase]) return teens[phrase];

    const parts = phrase.split(" ");
    if (parts.length === 2 && tens[parts[0]] && units[parts[1]]) {
        return tens[parts[0]] + units[parts[1]];
    }

    if (units[phrase]) return units[phrase];

    return word;
}

module.exports.formatLine = formatLine;
module.exports.process = process;