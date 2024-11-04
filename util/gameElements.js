
module.exports.betPhrases = [
    "What does a _amount_ _betName_ when _roll_ rolls?",
    "What happens to a _betName_ when _roll_ rolls?",
    "Does a _betName_ win on _roll_",
    "Does a _betName_ lose on _roll_",
    "what does rolling _roll_ pay in _betNickname_",
    "with a _betName_, _roll_ rolls, what happens",
];

module.exports.betNames = [
    {
        slug: "fieldBet",
        name: "Field Bet",
        nickname: "The Field",
        betType: "oneTimeBet"
    }
];

module.exports.diceRolls = [
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
