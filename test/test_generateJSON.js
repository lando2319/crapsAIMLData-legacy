var assert = require("assert");
var generateJSON = require("../util/generateJSON.js")

describe("Testing generateJSON", function () {
    it('With with _amount_ as, "$5" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_AMOUNT_",
            "",
            "$5",
            "",
            6,
            ""
        );

        assert.deepEqual(entry.tokens, ["$5"]);
        assert.deepEqual(entry.labels, ["AMOUNT"]);
    })

    it('With with _amount_ as, "5 dollars" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_AMOUNT_",
            "",
            "5 DOLLARS",
            "",
            6,
            ""
        );

        assert.deepEqual(entry.tokens, ["5", "DOLLARS"]);
        assert.deepEqual(entry.labels, ["AMOUNT", "NONE"]);
    })

    it('With with _betName_ as, "Field Bet" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_BETNAME_",
            "Field Bet",
            "",
            "",
            6,
            ""
        );

        assert.deepEqual(entry.tokens, ["FIELD", "BET"]);
        assert.deepEqual(entry.labels, ["BET_NAME", "BET_NAME"]);
    })

    it('With with _betName_ as, "Come Bet on 5" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_BETNAME_",
            "Come Bet on 5",
            "",
            "",
            6,
            ""
        );

        assert.deepEqual(entry.tokens, ["COME", "BET", "ON", "5"]);
        assert.deepEqual(entry.labels, ["BET_NAME", "BET_NAME", "BET_NAME", "BET_NAME"]);
    })

    it('With with _odds_ as, "$20" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_ODDS_",
            "",
            "",
            "$20",
            6,
            ""
        );

        assert.deepEqual(entry.tokens, ["WITH", "$20", "ODDS"]);
        assert.deepEqual(entry.labels, ["NONE", "ODDS", "NONE"]);
    })
    // TODO: setup '20 dollar odds' as a test, TDD, and add to codebase

    it('With with _odds_ as, "$20", and _amount_ as, "$20" should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_AMOUNT_ _ODDS_",
            "dud",
            "$20",
            "$20",
            6,
            ""
        );

        assert.deepEqual(entry.tokens, ["$20", "WITH", "$20", "ODDS"]);
        assert.deepEqual(entry.labels, ["AMOUNT", "NONE", "ODDS", "NONE"]);
    })

    it('With with _roll_ as 6 should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_ROLL_ ROLLS",
            "dud",
            "$20",
            "$20",
            6,
            ""
        );

        assert.deepEqual(entry.tokens, ["6", "ROLLS"]);
        assert.deepEqual(entry.labels, ["ROLL", "NONE"]);
    })

    it('With with _point_ as 6 should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_POINT_",
            "dud",
            "$20",
            "$20",
            6,
            "6"
        );

        assert.deepEqual(entry.tokens, ["6"]);
        assert.deepEqual(entry.labels, ["POINT"]);
    })

    it('With with all element should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "WITH _AMOUNT_ _BETNAME_ _ODDS_ AND _ROLL_ ROLLS",
            "Come Bet on 5",
            "$5",
            "$10",
            5,
            ""
        );

        assert.deepEqual(entry.tokens, ["WITH", "$5", "COME", "BET", "ON", "5", "WITH", "$10", "ODDS", "AND", "5", "ROLLS"]);
        assert.deepEqual(entry.labels, ["NONE", "AMOUNT", "BET_NAME", "BET_NAME", "BET_NAME", "BET_NAME", "NONE", "ODDS", "NONE", "NONE", "ROLL", "NONE"]);
    })

    // do one where amount and odds are the same number
})