var assert = require("assert");
var generateJSON = require("../util/generateJSON.js")

describe("Testing generateJSON", function () {
    it('With Four and Five as test cases, labelType as BET, should produce proper json', function () {
        var betPhrases = [
            "What happens to a _betName_ when _roll_ rolls?",
            "What does a _amount_ _betName_ pay when _roll_ rolls?"
        ];

        var betNames = [
            {
                slug: "fieldBet",
                name: "Field Bet",
                nickname: "The Field",
                amounts: [
                    "$5",
                ]
            }
        ];

        var diceRolls = [
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
        ];

        var jsonReturned = generateJSON.generate({betPhrases, betNames, diceRolls}, "BET", "")

        var expectation = [
            {
                text: 'What happens to a Field Bet when Four rolls?',
                label:'fieldBet'
            },
            {
                text: 'What happens to a Field Bet when 4 rolls?',
                label: 'fieldBet'
            },
            {
                text: 'What happens to a Field Bet when Five rolls?',
                label: 'fieldBet'
            },
            {
                text: 'What happens to a Field Bet when 5 rolls?',
                label: 'fieldBet'
            },
            {
                text: 'What does a $5 Field Bet pay when Four rolls?',
                label: 'fieldBet'
            },
            {
                text: 'What does a $5 Field Bet pay when 4 rolls?',
                label: 'fieldBet'
            },
            {
                text: 'What does a $5 Field Bet pay when Five rolls?',
                label: 'fieldBet'
            },
            {
                text: 'What does a $5 Field Bet pay when 5 rolls?',
                label: 'fieldBet'
            }
        ];

        assert.deepEqual(jsonReturned, expectation);
    })

    it('With Four and Five as test cases, labelType as AMOUNT, should produce proper json', function () {
        var betPhrases = [
            "What does a _amount_ _betName__odds_ pay when _roll_ rolls?"
        ];

        var betNames = [
            {
                slug: "fieldBet",
                name: "Field Bet",
                nickname: "The Field",
                amounts: [
                    "$5",
                ],
            },
            {
                slug: "comeBet9",
                name: "Come Bet on Nine",
                amounts: [
                    "$5"
                ],
                odds: [
                    "$10",
                    "$20",
                ]
            }
        ];

        var diceRolls = [
            {
                name: "Four",
                number: 4,
                aliases: []
            }
        ];

        var jsonReturned = generateJSON.generate({betPhrases, betNames, diceRolls}, "AMOUNT", "")

        var expectation = [
            {
                text: 'What does a $5 Field Bet pay when Four rolls?',
                label: '5'
            },
            {
                text: 'What does a $5 Field Bet pay when 4 rolls?',
                label: '5'
            },
            {
                text: 'What does a $5 Come Bet on Nine with $10 odds pay when Four rolls?',
                label: '5'
            },
            {
                text: 'What does a $5 Come Bet on Nine with $20 odds pay when Four rolls?',
                label: '5'
            },
            {
                text: 'What does a $5 Come Bet on Nine with $10 odds pay when 4 rolls?',
                label: '5'
            },
            {
                text: 'What does a $5 Come Bet on Nine with $20 odds pay when 4 rolls?',
                label: '5'
            }
        ];

        assert.deepEqual(jsonReturned, expectation);
    })

    it('With Four and Five as test cases, labelType as ODDS, should produce proper json', function () {
        var betPhrases = [
            "What does a _amount_ _betName__odds_ pay when _roll_ rolls?"
        ];

        var betNames = [
            {
                slug: "fieldBet",
                name: "Field Bet",
                nickname: "The Field",
                amounts: [
                    "$5",
                ],
            },
            {
                slug: "comeBet9",
                name: "Come Bet on Nine",
                amounts: [
                    "$5"
                ],
                odds: [
                    "$10",
                    "$20",
                ]
            }
        ];

        var diceRolls = [
            {
                name: "Four",
                number: 4,
                aliases: []
            }
        ];

        var jsonReturned = generateJSON.generate({betPhrases, betNames, diceRolls}, "ODDS", "")

        var expectation = [
            {
                text: 'What does a $5 Field Bet pay when Four rolls?',
                label: ''
            },
            {
                text: 'What does a $5 Field Bet pay when 4 rolls?',
                label: ''
            },
            {
                text: 'What does a $5 Come Bet on Nine with $10 odds pay when Four rolls?',
                label: '10'
            },
            {
                text: 'What does a $5 Come Bet on Nine with $20 odds pay when Four rolls?',
                label: '20'
            },
            {
                text: 'What does a $5 Come Bet on Nine with $10 odds pay when 4 rolls?',
                label: '10'
            },
            {
                text: 'What does a $5 Come Bet on Nine with $20 odds pay when 4 rolls?',
                label: '20'
            }
        ];

        assert.deepEqual(jsonReturned, expectation);
    })

    it('With a Dice Roll having an alias, should produce 2 elements', function () {
        var betPhrases = [
            "What happens to a _betName_ when _roll_ rolls?",
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
            }
        ];

        var jsonReturned = generateJSON.generate({betPhrases, betNames, diceRolls}, "ROLL", "")

        var expectation = [
            {
                text: 'What happens to a Field Bet when Two rolls?',
                label: '2'
            },
            {
                text: 'What happens to a Field Bet when Aces rolls?',
                label: '2'
            },
            {
                text: 'What happens to a Field Bet when 2 rolls?',
                label: '2'
            }
        ];

        assert.deepEqual(jsonReturned, expectation);
    })
})