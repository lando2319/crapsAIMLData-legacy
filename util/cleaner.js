function removeForAmountModel(phrase) {
    var cleanedBetPhrase = betPhrase.replace(/\b([2-9]|1[0-2]) rolls\b/g, "");
    cleanedBetPhrase = cleanedBetPhrase.replace(/\b([2-9]|1[0-2]) is rolled\b/g, "");
    cleanedBetPhrase = cleanedBetPhrase.replace(/\brolling ([2-9]|1[0-2])\b/g, "");
    cleanedBetPhrase = cleanedBetPhrase.replace(/\bwin on ([2-9]|1[0-2])\b/g, "");
    cleanedBetPhrase = cleanedBetPhrase.replace(/\blose on ([2-9]|1[0-2])\b/g, "");
    cleanedBetPhrase = cleanedBetPhrase.replace(/\$\d+\sodds/g, "");
    cleanedBetPhrase = cleanedBetPhrase.replace(/\bPlace Bet on (4|5|6|8|9|10)\b/g, "");
    cleanedBetPhrase = cleanedBetPhrase.replace(/\bCome Bet on (4|5|6|8|9|10)\b/g, "");

    var formattedPhrase = cleanedBetPhrase.replace("<amount>", "$" + i)

    return formattedPhrase;
};

// NEED FUNCITON FOR WORD TO NUMBER

module.exports.removeForAmountModel = removeForAmountModel;