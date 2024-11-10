var assert = require("assert");
var lineFormatter = require("../util/lineFormatter.js")

var betPkg = {
    slug: "comeBet10",
    name: "Come Bet on Ten",
    amounts: [
        "$5",
    ],
    odds: [
        "$10",
    ]
};

describe("Testing lineFormatter Process", function () {
    it('With betPkg with odds, should drop replace _odds_ with "with $10 odds" when formatting', function () {
        var rawLine = "What does a _amount_ _betName_ _odds_ pay when _roll_ rolls?";

        var formatPkg = lineFormatter.process(rawLine, betPkg, "Five", betPkg.amounts[0], betPkg.odds[0]);
        var expectation = {
            phrase: "What does a $5 Come Bet on Ten with $10 odds pay when Five rolls?",
            amount: 5,
            odds: 10
        };

        assert.deepEqual(formatPkg, expectation);
    })
})