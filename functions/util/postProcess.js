
function run(inputText, responseData, loggit) {
    console.log();
    logThis(loggit, "Starting Cleaning Process with " + inputText)
    logThis(loggit, "responseData " + responseData);


    var inputAsNums = replaceWordNumbers(inputText);

    console.log("Input as Nums is", inputAsNums);

    var numsInText = getNumbers(inputAsNums);

    var numValuesAdjusted = numberOfValuesAdjusted(responseData);

    var isHallucinating = numsInText.length < numValuesAdjusted

    var cleanedData = JSON.parse(JSON.stringify(responseData));

    if (isHallucinating) {
        logThis(loggit, "isHallucinating dropping to heirachey of values");

        var amountCheck = replaceMatch(responseData.amount, numsInText);
        if (responseData.amount > 0 && !amountCheck.match) {
            console.log("YOU HERE")
            cleanedData.amount = 0;
        };

        if (amountCheck.match) {
            numsInText = amountCheck.newArray;
        }

        var oddsCheck = replaceMatch(responseData.odds, numsInText);
        if (responseData.odds > 0 && !oddsCheck.match) {
            cleanedData.odds = 0;
        };

        if (oddsCheck.match) {
            numsInText = oddsCheck.newArray;
        }

        var rollMatch = replaceMatch(responseData.roll, numsInText);
        if (responseData.roll > 0 && !rollMatch.match) {
            cleanedData.roll = 0;
        };

        if (rollMatch.match) {
            numsInText = rollMatch.newArray;
        }

        var die1Check = replaceMatch(responseData.rollDie1, numsInText);
        if (responseData.rollDie1 > 0 && !die1Check.match) {
            cleanedData.rollDie1 = 0;
        };

        if (die1Check.match) {
            numsInText = die1Check.newArray;
        }

        var die2Check = replaceMatch(responseData.rollDie2, numsInText);
        if (responseData.rollDie2 > 0 && !die2Check.match) {
            cleanedData.rollDie2 = 0;
        };

        if (die2Check.match) {
            numsInText = die2Check.newArray;
        }
    };

    cleanedData.firestoreID = "";
    cleanedData.answers = [];
    cleanedData.supportImages = [];
    cleanedData.followupQuestions = [];

    return cleanedData;
};

function replaceMatch(hitTerm, incomingArray, loggit) {
    if (incomingArray.includes(hitTerm)) {
        logThis(loggit, "Hit found");

        const newArray = removeFirstOccurrence(incomingArray, hitTerm);
        return { match: true, newArray: newArray }
    } else {
        return { match: false, newArray: incomingArray }
    }
}

function removeFirstOccurrence(array, value) {
    const newArray = [...array];

    const index = newArray.indexOf(value);

    if (index !== -1) {
        newArray.splice(index, 1);
    }

    return newArray;
}

function logThis(loggit, msg) {
    if (loggit) {
        console.log(loggit, msg);
    }
}

function numberOfValuesAdjusted(responseData) {
    var countOfResponseNums = 0;
    if (responseData.amount > 0) {
        countOfResponseNums++;
    };

    if (responseData.odds > 0) {
        countOfResponseNums++;
    };

    if (responseData.roll > 0) {
        countOfResponseNums++;
    };

    if (responseData.rollDie1 > 0) {
        countOfResponseNums++;
    };

    if (responseData.rollDie2 > 0) {
        countOfResponseNums++;
    };

    return countOfResponseNums;
}

function getNumbers(str) {
    const matches = str.match(/\d+/g);
    return matches ? matches.map(Number) : [];
};


function replaceWordNumbers(str) {
    // 1) Split by word boundaries to keep punctuation separate tokens
    //    e.g. "twenty six," => ["twenty", " ", "six", ","]
    //    "This is  twenty" => ["This", " ", "is", "  ", "twenty"]
    //
    // Explanation of pattern:
    //    \b is a word boundary
    //    We split so we get tokens that are either "word-like" or "non-word" pieces
    //
    const tokens = str.split(/(\b)/);

    // 2) We'll define a small helper to parse consecutive number words
    const numberMap = {
        zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5,
        six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
        eleven: 11, twelve: 12, thirteen: 13, fourteen: 14,
        fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
        nineteen: 19,
        twenty: 20, thirty: 30, forty: 40, fifty: 50,
        sixty: 60, seventy: 70, eighty: 80, ninety: 90
    };

    function parseNumberWordSequence(startIndex) {
        // We'll accumulate a numeric value here
        let currentValue = 0;
        let consumed = 0;
        let hasParsedAny = false;

        for (let i = startIndex; i < tokens.length; i++) {
            // Trim token to ignore extra spaces
            let token = tokens[i].toLowerCase().trim();

            // If the token is 'and', skip it (e.g. "one hundred and five")
            if (token === 'and') {
                consumed++;
                continue;
            }
            // "hundred" => multiply current chunk by 100
            else if (token === 'hundred') {
                currentValue = currentValue === 0 ? 100 : currentValue * 100;
                consumed++;
                hasParsedAny = true;
            }
            // "thousand" => multiply by 1000 and end chunk
            else if (token === 'thousand') {
                currentValue = currentValue === 0 ? 1000 : currentValue * 1000;
                consumed++;
                hasParsedAny = true;
                // We stop after thousand because we're capping at 1000
                break;
            }
            // If it's a known base number (e.g. "twenty" => 20)
            else if (numberMap[token] !== undefined) {
                currentValue += numberMap[token];
                consumed++;
                hasParsedAny = true;
            }
            // If token is just a space or punctuation or not recognized as a number word, stop parsing
            else {
                // We break out because the numeric phrase has ended
                break;
            }
        }

        // If we actually parsed something, return { value, consumed }
        if (hasParsedAny) {
            return { value: currentValue, consumed };
        }

        // Otherwise return null to indicate no numeric phrase found
        return null;
    }

    // 3) Walk through tokens, find sequences that parse as numbers, replace them
    let i = 0;
    let resultTokens = [];

    while (i < tokens.length) {
        const parsed = parseNumberWordSequence(i);

        if (parsed && parsed.value > 0) {
            // We found a numeric phrase
            // Convert it to string
            resultTokens.push(String(parsed.value));
            // Skip the consumed tokens
            i += parsed.consumed;
        } else {
            // Not a numeric phrase, just push the current token
            resultTokens.push(tokens[i]);
            i += 1;
        }
    }

    // 4) Join them back into a single string
    return resultTokens.join('');
}


module.exports.run = run;
module.exports.replaceWordNumbers = replaceWordNumbers;
module.exports.getNumbers = getNumbers;