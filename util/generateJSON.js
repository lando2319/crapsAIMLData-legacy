var lineFormatter = require('./lineFormatter.js');

function generate() {
    var betPhrases = [
        "What does a _amount_ _betName_ when _roll_ rolls?",
        "What happens to a _betName_ when _roll_ rolls?",
        "Does a _betName_ win on _roll_",
        "Does a _betName_ lose on _roll_",
        "what does rolling _roll_ pay in _betNickname_",
        "with a _betName_, _roll_ rolls, what happens",
    ];

    var betNames = [
        {
            slug: "fieldBet",
            name: "Field Bet",
            nickname: "The Field",
            betType: "oneTimeBet"
        }
    ];

    var diceRolls = [
        {
            name: "Aces",
            number: 2,
            aliases: [
                "Two"
            ]
        },
        {
            name: "Ace Decuce",
            number: 3,
            aliases: [
                "Three"
            ]
        },
        {
            name: "Four",
            number: 4,
            aliases: []
        },
        {
            name: "Five",
            number: 5,
            aliases: []
        },
        {
            name: "Six",
            number: 6,
            aliases: []
        },
        {
            name: "Seven",
            number: 7,
            aliases: []
        },
        {
            name: "Eight",
            number: 8,
            aliases: []
        },
        {
            name: "Nine",
            number: 9,
            aliases: []
        },
        {
            name: "Ten",
            number: 10,
            aliases: []
        },
        {
            name: "Yo",
            number: 11,
            aliases: [
                "Eleven",
                "Yo Eleven"
            ]
        },
        {
            name: "Twelve",
            number: 12,
            aliases: []
        }
    ];

    var jsonToGo = [];

    betNames.forEach(betNamePkg => {
        console.log("Generating for", betNamePkg.name);

        betPhrases.forEach(betPhrase => {
            console.log("Bet Phrase", betPhrase);

            diceRolls.forEach(diceRollPkg => {
                console.log("Dice Roll", diceRollPkg.name);

                var hasAmount = betPhrase.includes("_amount_");
                var amount = "";

                if (hasAmount) {
                    amount = "$5";
                };

                var allName = diceRollPkg.aliases;
                allName.push(diceRollPkg.name);
                
                allName.forEach(diceRollName => {

                    var formattedPhrase = lineFormatter.formatLine(betPhrase, betNamePkg, diceRollName);

                    jsonToGo.push({
                        "text": formattedPhrase,
                        "label": betNamePkg.slug + "_" + amount + "_" + diceRollPkg.number
                    });
                });
            });
        });
    });

    return jsonToGo;
};

module.exports.generate = generate;