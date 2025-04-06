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
            0,
            0,
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
            0,
            0,
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
            0,
            0,
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
            0,
            0,
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
            0,
            0,
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
            0,
            0,
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
            0,
            0,
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
            0,
            0,
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
            0,
            0,
            ""
        );

        assert.deepEqual(entry.tokens, ["WITH", "$5", "COME", "BET", "ON", "5", "WITH", "$10", "ODDS", "AND", "5", "ROLLS"]);
        assert.deepEqual(entry.labels, ["NONE", "AMOUNT", "BET_NAME", "BET_NAME", "BET_NAME", "BET_NAME", "NONE", "ODDS", "NONE", "NONE", "ROLL", "NONE"]);
    })

    // do one where amount and odds are the same number

    it('With with _die1_ as 2 should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_DIE1_",
            "dud",
            "",
            "",
            6,
            2,
            4,
            ""
        );

        assert.deepEqual(entry.tokens, ["2"]);
        assert.deepEqual(entry.labels, ["DIE"]);
    })

    // This format might need to be updated, if all the entry are in a different format
    it('With with _die1_ - _die2_ as 2-4 should produce proper entry', function () {
        var entry = generateJSON.genearateTokensAndLabels(
            "_DIE1_ - _DIE2_",
            "dud",
            "",
            "",
            6,
            2,
            4,
            ""
        );

        assert.deepEqual(entry.tokens, ["2", "-", "4"]);
        assert.deepEqual(entry.labels, ["DIE", "NONE", "DIE"]);
    })

    it('With a phrase ending with, "when the Point is Five" should get point token for each point number', function () {
        var loggit = "";
        var testGameElements = {
            betPhrases: [
                "How much do the odds pay on _betName_ when the Point is _point_"
            ],
            betNames:[
                {
                    slug: "passLine",
                    name: "Pass Line Bet",
                    nickname: "The Pass Line",
                    hasOdds: true,
                    min: 5
                }
            ],
            generalBetPhrases:[]
        }
        
        var jsonToGo = generateJSON.generateWordTagging(testGameElements, loggit);

        var expecationLine1 = {
            "labels": [
                "NONE",
                "NONE",
                "NONE",
                "NONE",
                "NONE",
                "NONE",
                "NONE",
                "BET_NAME",
                "BET_NAME",
                "BET_NAME",
                "NONE",
                "NONE",
                "NONE",
                "NONE",
                "POINT",
            ],
            "tokens": [
                "HOW",
                "MUCH",
                "DO",
                "THE",
                "ODDS",
                "PAY",
                "ON",
                "PASS",
                "LINE",
                "BET",
                "WHEN",
                "THE",
                "POINT",
                "IS",
                "4"
            ]
        }

        assert.deepEqual(jsonToGo[0], expecationLine1);
        assert.deepEqual(jsonToGo[1].tokens[14], "5");
        assert.deepEqual(jsonToGo[2].tokens[14], "6");
        assert.deepEqual(jsonToGo[3].tokens[14], "8");
        assert.deepEqual(jsonToGo[4].tokens[14], "9");
        assert.deepEqual(jsonToGo[5].tokens[14], "10");
    })

    it('With the phrase, "How does the Pass Line Bet work" should only get one instance with proper tokens and labels', function () {
        var loggit = "";
        var testGameElements = {
            betPhrases: [
                "How does the _betName_ work"
            ],
            betNames:[
                {
                    slug: "passLine",
                    name: "Pass Line Bet",
                    nickname: "The Pass Line",
                    hasOdds: true,
                    min: 5
                }
            ],
            generalBetPhrases:[]
        }
        
        var jsonToGo = generateJSON.generateWordTagging(testGameElements, loggit);

        var expecation = [
            {
                "tokens": [
                    "HOW",
                    "DOES",
                    "THE",
                    "PASS",
                    "LINE",
                    "BET",
                    "WORK"
                ],
                "labels": [
                    "NONE",
                    "NONE",
                    "NONE",
                    "BET_NAME",
                    "BET_NAME",
                    "BET_NAME",
                    "NONE"
                ]
            }
        ]

        assert.deepEqual(jsonToGo, expecation);
    })
})