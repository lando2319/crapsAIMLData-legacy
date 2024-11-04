var assert = require("assert");
var generateJSON = require("../util/generateJSON.js")

describe("Testing generateJSON", function () {
    it('With Four and Five as test cases, ', function () {
        var betPhrases = [
            "What happens to a _betName_ when _roll_ rolls?",
            "What does a _amount_ _betName_ when _roll_ rolls?"
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
                text: 'What happens to a Field Bet when Five rolls?',
                label: 'fieldBet__5'
            },
            {
                text: 'What does a $5 Field Bet when Four rolls?',
                label: 'fieldBet_5_4'
            },
            {
                text: 'What does a $5 Field Bet when Five rolls?',
                label: 'fieldBet_5_5'
            }
        ];

        assert.deepEqual(jsonReturned, expectation);
    })
})