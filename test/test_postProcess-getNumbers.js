var assert = require("assert");
var postProcess = require("../functions/util/postProcess.js")

describe("Testing postProcess getNumbers", function () {
    it('Should get two numbers in array with sentence, "2 with 2"', function () {
        var inputText = "2 with 2"
        var cleanedData = postProcess.getNumbers(inputText);
        assert.deepEqual(cleanedData, [2, 2])
    })
})