var assert = require("assert");
var lineFormatter = require("../util/lineFormatter.js")
var betNamePkg = {
    "name": "Field Bet",
    "nickname": "The Field"
};

describe("Testing lineFormatter", function () {
    it('With _amount_, _betName_, and _roll_ should properly swap in values', function () {
        var rawLine = "What does a _amount_ _betName_ when _roll_ rolls?";

        var formattedLine = lineFormatter.formatLine(rawLine, betNamePkg, "Aces", "$5", "");
        var expectation = "What does a $5 Field Bet when Aces rolls?";

        assert.deepEqual(formattedLine, expectation);
    })

    it('With no _amount_, just _betName_ and _roll_ should properly swap in values', function () {
        var rawLine = "What happens to a _betName_ when _roll_ rolls?";
        var formattedLine = lineFormatter.formatLine(rawLine, betNamePkg, "Aces", "", "");
        var expectation = "What happens to a Field Bet when Aces rolls?";

        assert.deepEqual(formattedLine, expectation);
    })
})