var assert = require("assert");
var generateJSON = require("../util/generateJSON.js")

describe("Testing generateJSON", function () {
    it('With Four and Five as test cases, ', function () {
        var betPhrases = [
            "What happens to a _betName_ when _roll_ rolls?",
            "What does a _amount_ _betName_ pay when _roll_ rolls?"
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

        var jsonReturned = generateJSON.generate({betPhrases, betNames, diceRolls}, "")

        var expectation = [
            {
                text: 'What happens to a Field Bet when Four rolls?',
                label: 'fieldBet__4'
            },
            {
                text: 'What happens to a Field Bet when 4 rolls?',
                label: 'fieldBet__4'
            },
            {
                text: 'What happens to a Field Bet when Five rolls?',
                label: 'fieldBet__5'
            },
            {
                text: 'What happens to a Field Bet when 5 rolls?',
                label: 'fieldBet__5'
            },
            {
                text: 'What does a $5 Field Bet pay when Four rolls?',
                label: 'fieldBet_5_4'
            },
            {
                text: 'What does a Five Dollar Field Bet pay when Four rolls?',
                label: 'fieldBet_5_4'
            },
            {
                text: 'What does a $5 Field Bet pay when 4 rolls?',
                label: 'fieldBet_5_4'
            },
            {
                text: 'What does a Five Dollar Field Bet pay when 4 rolls?',
                label: 'fieldBet_5_4'
            },
            {
                text: 'What does a $5 Field Bet pay when Five rolls?',
                label: 'fieldBet_5_5'
            },
            {
                text: 'What does a Five Dollar Field Bet pay when Five rolls?',
                label: 'fieldBet_5_5'
            },
            {
                text: 'What does a $5 Field Bet pay when 5 rolls?',
                label: 'fieldBet_5_5'
            },
            {
                text: 'What does a Five Dollar Field Bet pay when 5 rolls?',
                label: 'fieldBet_5_5'
            }
        ]

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

        var jsonReturned = generateJSON.generate({betPhrases, betNames, diceRolls}, "")

        var expectation = [
            {
                text: 'What happens to a Field Bet when Two rolls?',
                label: 'fieldBet__2'
            },
            {
                text: 'What happens to a Field Bet when Aces rolls?',
                label: 'fieldBet__2'
            },
            {
                text: 'What happens to a Field Bet when 2 rolls?',
                label: 'fieldBet__2'
            }
        ];

        assert.deepEqual(jsonReturned, expectation);
    })
})