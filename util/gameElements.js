
module.exports.betPhrases = [
    "What happens to my _amount_ _betName_ if _roll_ rolls?",
    "What does a _amount_ _betName_ pay when _roll_ rolls?",
    "What happens to a _betName_ when _roll_ rolls?",
    "Does a _betName_ win on _roll_",
    "Does a _betName_ lose on _roll_",
    "what does rolling _roll_ pay in _betNickname_",
    "with a _betName_, _roll_ rolls, what happens",
    "if _roll_ rolls what happens to my _betName_",
    "What does a _amount_ _betName_ pay, if _roll_ rolls",
    "If I have _amount_ in the _betName_ does it win if _roll_ rolls?",
    "Does my _amount_ bet in _betNickname_ win if _roll_ is rolled",
    "Does my _betName_ win if _roll_ is rolled?",
    "How much does my _amount_ _betName_ pay if _roll_ is rolled"
];

// Not in use, using "Auto" on Create ML
module.exports.validationBetPhrases = [
    "if _roll_ rolls what happens to my _betName_",
    "What does a _amount_ _betName_ pay, if _rolls_"
];

module.exports.betNames = [
    {
        slug: "fieldBet",
        name: "Field Bet",
        nickname: "The Field",
        amounts: [
            "Five Dollar",
            "$5",
        ],
        betType: "oneTimeBet"
    },
    {
        slug: "comeBet",
        name: "Come Bet",
        nickname: "The Come",
        amounts: [
            "Five Dollar",
            "$5",
        ],
        betType: "contract"
    },
    {
        slug: "cAndE",
        name: "C&E",
        nickname: "The C&E",
        amounts: [
            "Two Dollar",
            "$2",
            "Four Dollar",
            "$4",
            "Six Dollar",
            "$6",
            "Twenty Dollar",
            "$20"
        ],
        betType: "oneTimeBet"
    },
    {
        slug: "crapCheck",
        name: "Crap Check",
        nickname: "Crap Check",
        amounts: [
            "One Dollar",
            "$1",
            "Five Dollar",
            "$5",
            "20 Dollar",
            "$20"
        ],
        betType: "oneTimeBet"
    },
    {
        slug: "hardFour",
        name: "Hard Four",
        nickname: "Hard Four",
        amounts: [
            "One Dollar",
            "$1",
            "Five Dollar",
            "$5",
            "20 Dollar",
            "$20"
        ],
        betType: "oneTimeBet"
    },
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

module.exports.extraTrainingData = [
    {
        "text": "What does a $5 Field Bet pay if two rolls",
        "label": "fieldBet_5_2"
    },
    {
        "text": "If a two rolls, what happens to my Five Dollar Field Bet",
        "label": "fieldBet_5_2"
    },
    {
        "text": "What does a $5 Field Bet pay if Aces Rolls",
        "label": "fieldBet_5_2"
    },
    {
        "text": "What does a Field Bet pay if twelve rolls",
        "label": "fieldBet__12"
    },
    {
        "text": "If a twelve rolls, what happens to my Field Bet",
        "label": "fieldBet__12"
    },
    {
        "text": "What does a Field Bet pay if a 12 Rolls",
        "label": "fieldBet__12"
    },
    {
        "text": "Does a Field Bet Win on Twelve",
        "label": "fieldBet__12"
    },
    {
        "text": "How much does the Field Bet pay if a Twelve rolls",
        "label": "fieldBet__12"
    },
    {
        "text": "What happens to the Field if a twelve rolls?",
        "label": "fieldBet__12"
    },
    {
        "text": "Does a Field Bet lose if a Twelve rolls",
        "label": "fieldBet__12"
    },
    {
        "text": "If a Twelve rolls does my Field Bet win?",
        "label": "fieldBet__12"
    },
    {
        "text": "If I have a 10 Dollar Field Bet does it win on Twelve?",
        "label": "fieldBet_10_12"
    },
    {
        "text": "How much does a $10 Field Bet pay if Twelve rolls",
        "label": "fieldBet_10_12"
    },
    {
        "text": "Does a Field Bet win on Twelve",
        "label": "fieldBet__12"
    },
    {
        "text": "What does a Field Bet pay if a 11 Rolls",
        "label": "fieldBet__11"
    },
    {
        "text": "Does a Field Bet Win on Eleven",
        "label": "fieldBet__11"
    },
    {
        "text": "How much does the Field Bet pay if a Eleven rolls",
        "label": "fieldBet__11"
    },
    {
        "text": "What happens if the Field if a Yo rolls?",
        "label": "fieldBet__11"
    },
    {
        "text": "Does a Field Bet lose if a Yo Eleven rolls",
        "label": "fieldBet__11"
    },
    {
        "text": "Does my Field Bet lose if Eight rolls?",
        "label": "fieldBet__8"
    },
    {
        "text": "What happens to my Field Bet if 8 rolls",
        "label": "fieldBet__8"
    },
    {
        "text": "Does a Field bet win if an eight is rolled?",
        "label": "fieldBet__8"
    },
    {
        "text": "How much does a Field Bet pay if Eight rolls",
        "label": "fieldBet__8"
    },
    {
        "text": "If an eight rolls does my Field Bet win?",
        "label": "fieldBet__8"
    },
    {
        "text": "What happens to a Field Bet if Eight rolls",
        "label": "fieldBet__8"
    },
    {
        "text": "Does a Field bet win if Eight rolls",
        "label": "fieldBet__8"
    },
    {
        "text": "Does my Field Bet lose if Five rolls?",
        "label": "fieldBet__5"
    },
    {
        "text": "What happens to my Field Bet if 5 rolls",
        "label": "fieldBet__5"
    },
    {
        "text": "Does a Field bet win if an five is rolled?",
        "label": "fieldBet__5"
    },
    {
        "text": "How much does a Field Bet pay if Five rolls",
        "label": "fieldBet__5"
    },
    {
        "text": "If a five rolls does my Field Bet win?",
        "label": "fieldBet__5"
    },
    {
        "text": "Does a Field Bet win on Five",
        "label": "fieldBet__5"
    },
    {
        "text": "If I roll a five does my Field Bet win?",
        "label": "fieldBet__5"
    },
    {
        "text": "What does a $4 C&E Bet pay if Six rolls",
        "label": "cAndE_4_6"
    },
    {
        "text": "If a Six rolls, what happens to my Four Dollar C&E Bet",
        "label": "cAndE_4_6"
    },
    {
        "text": "What does a $4 C&E Bet pay if Ten Rolls",
        "label": "cAndE_4_10"
    },
    {
        "text": "What happens to my Four Dollar C&E bet if Six rolls",
        "label": "cAndE_4_6"
    },
    {
        "text": "If an Eleven rolls, does my $4 C&E win",
        "label": "cAndE_4_11"
    },
    {
        "text": "If a 10 rolls does my $4 C&E bet win",
        "label": "cAndE_4_10"
    },
    {
        "text": "Does a C&E bet win on Six",
        "label": "cAndE__6"
    },
    {
        "text": "Does a C&E lose on Four",
        "label": "cAndE__4"
    },
    {
        "text": "Does my Six Dollar C&E bet lose if Six rolls",
        "label": "cAndE_6_6"
    },
    {
        "text": "if an Eleven rolls does a six doller C&E bet win",
        "label": "cAndE_6_11"
    },
    {
        "text": "If a 10 rolls does my $6 C&E bet win",
        "label": "cAndE_6_10"
    },
    {
        "text": "Does a C&E bet win on Six",
        "label": "cAndE__6"
    },
];
