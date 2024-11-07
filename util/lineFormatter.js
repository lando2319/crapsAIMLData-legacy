function formatLine(betPhrase, betNamePkg, diceRollName, betAmount) {
    var formattedPhrase = betPhrase
        .replace("_amount_", betAmount) // expand with different betAmounts per betName
        .replace("_betName_", betNamePkg.name)
        .replace("_betNickname_", betNamePkg.nickname)
        .replace("_roll_", diceRollName)

    return formattedPhrase
};

module.exports.formatLine = formatLine;