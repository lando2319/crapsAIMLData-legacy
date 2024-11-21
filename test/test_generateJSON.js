var assert = require("assert");
var generateJSON = require("../util/generateJSON.js")

describe("Testing generateJSON", function () {
    it('With with _amount_ as, "$5" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_amount_",
            "",
            "$5",
            "",
            6
        );

        assert.deepEqual(entry.tokens, ["$5"]);
        assert.deepEqual(entry.labels, ["AMOUNT"]);
    })

    it('With with _amount_ as, "5 dollars" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_amount_",
            "",
            "5 dollars",
            "",
            6
        );

        assert.deepEqual(entry.tokens, ["5", "dollars"]);
        assert.deepEqual(entry.labels, ["AMOUNT", "NONE"]);
    })

    it('With with _betName_ as, "Field Bet" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_betName_",
            "Field Bet",
            "",
            "",
            6
        );

        assert.deepEqual(entry.tokens, ["Field", "Bet"]);
        assert.deepEqual(entry.labels, ["BET_NAME", "BET_NAME"]);
    })

    it('With with _betName_ as, "Come Bet on 5" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_betName_",
            "Come Bet on 5",
            "",
            "",
            6
        );

        assert.deepEqual(entry.tokens, ["Come", "Bet", "on", "5"]);
        assert.deepEqual(entry.labels, ["BET_NAME", "BET_NAME", "BET_NAME", "BET_NAME"]);
    })

    it('With with _odds_ as, "$20" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_odds_",
            "",
            "",
            "$20",
            6
        );

        assert.deepEqual(entry.tokens, ["with", "$20", "odds"]);
        assert.deepEqual(entry.labels, ["NONE", "ODDS", "NONE"]);
    })
    // TODO: setup '20 dollar odds' as a test, TDD, and add to codebase

    it('With with _odds_ as, "$20", and _amount_ as, "$20" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_amount_ _odds_",
            "dud",
            "$20",
            "$20",
            6
        );

        assert.deepEqual(entry.tokens, ["$20", "with", "$20", "odds"]);
        assert.deepEqual(entry.labels, ["AMOUNT", "NONE", "ODDS", "NONE"]);
    })

    it('With with _roll_ as 6 should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_roll_ rolls",
            "dud",
            "$20",
            "$20",
            6
        );

        assert.deepEqual(entry.tokens, ["6", "rolls"]);
        assert.deepEqual(entry.labels, ["ROLL", "NONE"]);
    })

    it('With with all element should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "With _amount_ _betName_ _odds_ and _roll_ rolls",
            "Come Bet on 5",
            "$5",
            "$10",
            5
        );

        assert.deepEqual(entry.tokens, ["With", "$5", "Come", "Bet", "on", "5", "with", "$10", "odds", "and", "5", "rolls"]);
        assert.deepEqual(entry.labels, ["NONE", "AMOUNT", "BET_NAME", "BET_NAME", "BET_NAME", "BET_NAME", "NONE", "ODDS", "NONE", "NONE", "ROLL", "NONE"]);
    })


    // do one where amount and odds are the same number
})