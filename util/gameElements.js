
module.exports.betPhrases = [
    "If I have a _amount_ _betName_ _odds_ with a Point of _point_ what does it pay if _roll_ is rolled",
    "How does the _betName_ work",
    "What happens to my _amount_ _betName_ _odds_ if _roll_ rolls",
    "What does a _amount_ _betName_ _odds_ pay when _roll_ rolls",
    "What happens to a _betName_ when _roll_ rolls",
    "Does a _betName_ win on _roll_",
    "Does a _betName_ lose on _roll_",
    "what does rolling _roll_ pay in _betNickname_",
    "with a _betName_, _roll_ rolls, what happens",
    "if _roll_ rolls what happens to my _betName_",
    "What does a _amount_ _betName_ _odds_ pay, if _roll_ rolls",
    "If I have _amount_ on the _betName_ _odds_ does it win if _roll_ rolls",
    "Does my _amount_ bet in _betNickname_ win if _roll_ is rolled",
    "Does my _betName_ win if _roll_ is rolled",
    "How much does my _amount_ _betName_ _odds_ pay if _roll_ is rolled",
    "If I have a _amount_ _betName_ _odds_ what happens if _roll_ rolls",
    "Do a _amount_ _betName_ _odds_ win on _roll_",
    "What happens to my _amount_ _betName_ if the dice roll _roll_ as _die1_ - _die2_",
];

module.exports.generalBetNames = [
    {
        slug: "hardways",
        name: "Hardways"
    },
    {
        slug: "hopbets",
        name: "Hop Bets"
    },
]

module.exports.generalBetPhrases = [
    "How do the _betName_ work",
    "Are the _betName_ a good bet",
    "Tell me about the _betName_",
];

module.exports.nonBets = [
    "hot dog",
    "Hamburger",
    "Chicken Sandwich",
    "Ice Cream",
];

// I'm going to need to be able to capture the point number
module.exports.betNames = [
    {
        slug: "passLine",
        name: "Pass Line Bet",
        nickname: "The Pass Line",
        hasOdds: true,
        min:5
    },
    {
        slug: "dontPassLine",
        name: "Don't Pass Bet",
        nickname: "The Don't Pass Line",
        hasOdds: true,
        min:5
    },
    {
        slug: "dontComeBet",
        name: "Don't Come Bet",
        nickname: "The DC",
        min:5
    },
    {
        slug: "dontComeBet4",
        name: "Don't Come Bet on 4",
        hasOdds: true,
        min:5
    },
    {
        slug: "dontComeBet5",
        name: "Don't Come Bet on 5",
        hasOdds: true,
        min:5
    },
    {
        slug: "dontComeBet6",
        name: "Don't Come Bet on 6",
        hasOdds: true,
        min:5
    },
    {
        slug: "dontComeBet8",
        name: "Don't Come Bet on 8",
        hasOdds: true,
        min:5
    },
    {
        slug: "dontComeBet9",
        name: "Don't Come Bet on 9",
        hasOdds: true,
        min:5
    },
    {
        slug: "dontComeBet10",
        name: "Don't Come Bet on 10",
        hasOdds: true,
        min:5
    },
    {
        slug: "layBet4",
        name: "Lay Bet on 4",
        min:40
    },
    {
        slug: "layBet5",
        name: "Lay Bet on 5",
        min:30
    },
    {
        slug: "layBet6",
        name: "Lay Bet on 6",
        min:25
    },
    {
        slug: "layBet8",
        name: "Lay Bet on 8",
        min:25
    },
    {
        slug: "layBet9",
        name: "Lay Bet on 9",
        min:30
    },
    {
        slug: "layBet10",
        name: "Lay Bet on 10",
        min:40
    },
    {
        slug: "fieldBet",
        name: "Field Bet",
        nickname: "The Field",
        min:5
    },
    {
        slug: "comeBet",
        name: "Come Bet",
        nickname: "The Come",
        min:5
    },
    {
        slug: "placeBet4",
        name: "Place Bet on 4",
        min:5
    },
    {
        slug: "placeBet5",
        name: "Place Bet on 5",
        min:5
    },
    {
        slug: "placeBet6",
        name: "Place Bet on 6",
        min:6
    },
    {
        slug: "placeBet8",
        name: "Place Bet on 8",
        min:6
    },
    {
        slug: "placeBet9",
        name: "Place Bet on 9",
        min:5
    },
    {
        slug: "placeBet10",
        name: "Place Bet on 10",
        min:5
    },
    {
        slug: "buyBet4",
        name: "Buy Bet on 4",
        min:20
    },
    {
        slug: "buyBet10",
        name: "Buy Bet on 10",
        min:20
    },
    {
        slug: "comeBet4",
        name: "Come Bet on 4",
        hasOdds: true,
        min:5
    },
    {
        slug: "comeBet5",
        name: "Come Bet on 5",
        hasOdds: true,
        min:5
    },
    {
        slug: "comeBet6",
        name: "Come Bet on 6",
        hasOdds: true,
        min:5
    },
    {
        slug: "comeBet8",
        name: "Come Bet on 8",
        hasOdds: true,
        min:5
    },
    {
        slug: "comeBet9",
        name: "Come Bet on 9",
        hasOdds: true,
        min:5
    },
    {
        slug: "comeBet10",
        name: "Come Bet on 10",
        hasOdds: true,
        min:5
    },
    {
        slug: "cAndE",
        name: "C&E",
        min:2
    },
    {
        slug: "crapCheck",
        name: "Crap Check",
        min:1
    },
    {
        slug: "acesBet",
        name: "Aces Bet",
        min:1
    },
    {
        slug: "aceDeuceBet",
        name: "Ace Deuce Bet",
        min:1
    },
    {
        slug: "yoBet",
        name: "Yo Bet",
        min:1
    },
    {
        slug: "twelveBet",
        name: "12 Bet",
        min:1
    },
    {
        slug: "hornBet",
        name: "Horn Bet",
        min:4
    },
    {
        slug: "hornHighAcesBet",
        name: "Horn High Aces Bet",
        min:5
    },
    {
        slug: "hornHighAceDeuceBet",
        name: "Horn High Ace Deuce Bet",
        min:5
    },
    {
        slug: "hornHighYoBet",
        name: "Horn High Yo Bet",
        min:5
    },
    {
        slug: "hornHighTwelveBet",
        name: "Horn High Twelve Bet",
        min:5
    },
    {
        slug: "any7",
        name: "Any 7 Bet",
        min:1
    },
    {
        slug: "worldBet",
        name: "World Bet",
        min:5
    },
    {
        slug: "hard4",
        name: "Hard 4",
        min:1
    },
    {
        slug: "hard6",
        name: "Hard 6",
        min:1
    },
    {
        slug: "hard8",
        name: "Hard 8",
        min:1
    },
    {
        slug: "hard10",
        name: "Hard 10",
        min:1
    },
    {
        slug: "hopping13",
        name: "1-3 Hopping",
        nickname: "3-1 Hopping", // setup multiple nicknames as aliases do easy 4 hopping, and without dash
        min:1
    },
    {
        slug: "hopping22",
        name: "2-2 Hopping",
        nickname: "Hard Four Hopping",
        min:1
    },
    {
        slug: "hopping23",
        name: "2-3 Hopping",
        nickname: "3-2 Hopping",
        min:1
    },
    {
        slug: "hopping14",
        name: "1-4 Hopping",
        nickname: "4-1 Hopping",
        min:1
    },
    {
        slug: "hopping15",
        name: "1-5 Hopping",
        nickname: "5-1 Hopping",
        min:1
    },
    {
        slug: "hopping33",
        name: "3-3 Hopping",
        nickname: "Hard Six Hopping", // setup multiple nicknames as aliases do easy 4 hopping, and without dash
        min:1
    },
    {
        slug: "hopping24",
        name: "2-4 Hopping",
        nickname: "4-2 Hopping",
        min:1
    },
    {
        slug: "hopping26",
        name: "2-6 Hopping",
        nickname: "6-2 Hopping",
        min:1
    },
    {
        slug: "hopping44",
        name: "4-4 Hopping",
        nickname: "Hard Eight Hopping", // setup multiple nicknames as aliases do easy 4 hopping, and without dash
        min:1
    },
    {
        slug: "hopping35",
        name: "3-5 Hopping",
        nickname: "5-3 Hopping",
        min:1
    },
    {
        slug: "hopping36",
        name: "3-6 Hopping",
        nickname: "6-3 Hopping",
        min:1
    },
    {
        slug: "hopping45",
        name: "4-5 Hopping",
        nickname: "5-4 Hopping",
        min:1
    },
    {
        slug: "hopping46",
        name: "4-6 Hopping",
        nickname: "6-4 Hopping", // setup multiple nicknames as aliases do easy 10 hopping, and without dash
        min:1
    },
    {
        slug: "hopping55",
        name: "5-5 Hopping",
        nickname: "Hard Ten Hopping",
        min:1
    },
    {
        slug: "hoppingEasy6s",
        name: "Easy 6s Hopping",
        nickname: "Easy 6s Hopping",
        min:2
    },
    {
        slug: "hoppingEasy8s",
        name: "Easy 8s Hopping",
        nickname: "Easy 8s Hopping",
        min:2
    },
    {
        slug: "hopping16",
        name: "1-6 Hopping",
        nickname: "6-1 Hopping",
        min:1
    },
    {
        slug: "hopping25",
        name: "2-5 Hopping",
        nickname: "5-2 Hopping",
        min:1
    },
    {
        slug: "hopping34",
        name: "3-4 Hopping",
        nickname: "4-3 Hopping",
        min:1
    },
];