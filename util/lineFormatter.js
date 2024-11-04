function formatLine(betPhrase, betNamePkg, diceRollName) {
    var formattedPhrase = betPhrase
        .replace("_amount_", "$5") // expand with different betAmounts per betName
        .replace("_betName_", betNamePkg.name)
        .replace("_betNickname_", betNamePkg.nickname)
        .replace("_roll_", diceRollName)

    return formattedPhrase
};

module.exports.formatLine = formatLine;