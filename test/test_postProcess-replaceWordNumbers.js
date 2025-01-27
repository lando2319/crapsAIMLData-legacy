var assert = require("assert");
var postProcess = require("../functions/util/postProcess.js")

describe("Testing postProcess replaceWordNumbers", function () {
    it('Should replace two with 2', function () {
        var inputText = "How does the Pass Line work if I roll a two"
        var cleanedData = postProcess.replaceWordNumbers(inputText);
        assert.equal(cleanedData, "How does the Pass Line work if I roll a 2")
    })

    it('Should replace "two other number four" with, "2 other number 4"', function () {
        var inputText = "two other number four"
        var cleanedData = postProcess.replaceWordNumbers(inputText);
        assert.equal(cleanedData, "2 other number 4")
    })

    it('Should leave alone already existing number "two other number 4" with, "2 other number 4"', function () {
        var inputText = "two other number 4"
        var cleanedData = postProcess.replaceWordNumbers(inputText);
        assert.equal(cleanedData, "2 other number 4")
    })
})