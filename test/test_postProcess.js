var assert = require("assert");
var postProcess = require("../functions/util/postProcess.js")

describe("Testing generateJSON", function () {
    it('With invalid post process, should clean digits', function () {
        var inputText = "How does the Pass Line work if I roll a 2"
        var loggit = "";
        var responseData = {
            "amount":1.23,
            "bet_name":"Pass Line",
            "odds":1,
            "point":0,
            "roll":2,
            "rollDie1":1,
            "rollDie2":1
        };

        var expecation = {
            "amount":0,
            "bet_name":"Pass Line",
            "odds":0,
            "point":0,
            "roll":2,
            "rollDie1":0,
            "rollDie2":0
        };

        var loggit = "";
        var cleanedData = postProcess.run(inputText, responseData, loggit);

        assert.deepEqual(cleanedData, expecation)
    })
})