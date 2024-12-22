const { mainFlow } = require("./genAIFlow.js");

(async () => {
    // const output = await mainFlow({
    //     message:"How much does a $4 Horn Bet pay 12 rolls"
    // })
    const output = await mainFlow("How much does a $4 Horn Bet pay if 12 rolls")

    console.log("output");
    console.log(output);
    process.exit(0);
})();







// WORKS 
// const { simpleFlow } = require("./genAIFlow.js");

// (async () => {
//     const output = await simpleFlow("How much does a $4 Horn Bet pay 12 rolls")

//     console.log("output");
//     console.log(output);
//     process.exit(0);
// })();
