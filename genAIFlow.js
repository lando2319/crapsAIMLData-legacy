require('dotenv').config({ path: __dirname + '/.env' })

const { gemini15Flash, googleAI } = require('@genkit-ai/googleai');
const { genkit, z } = require('genkit');

const parserAI = genkit({
    promptDir: "parserPrompts",
    plugins: [
        googleAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY
        })
    ],
    model: gemini15Flash
});

const talkerAI = genkit({
    promptDir: "talkerPrompts",
    plugins: [
        googleAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY
        })
    ],
    model: gemini15Flash
});


const ParseSchema = parserAI.defineSchema(
    'ParseSchema',
    z.object({
        bet_name: z.string(),
        amount: z.number(),
        roll: z.number()
    })
)

const TalkerSchema = parserAI.defineSchema(
    'TalkerSchema',
    z.object({
        headline: z.string(),
        bet_details: z.string()
    })
)

function calculateHorn(d) {
    var perBetAmount = d.amount / 4;
    d.full_payout = 0;
    d.still_up_payout = 0;

    if (d.roll == 3 || d.roll == 11) {
        d.full_payout = perBetAmount * 16;
        d.still_up_payout = d.full_payout - d.amount;
    } else if (d.roll == 2 || d.roll == 12) {
        d.full_payout = perBetAmount * 31;
        d.still_up_payout = d.full_payout - d.amount;
    };
}

exports.mainFlow = talkerAI.defineFlow(
    {
        name: 'mainFlow'
    },
    async (inputData) => {
        const { output: parserOutput } = await parserAI.generate({
            model: gemini15Flash,
            prompt: inputData,
            output: { schema: ParseSchema }
        })

        console.log("parserAI Generated", parserOutput);

        calculateHorn(parserOutput);
        parserOutput.message = inputData;

        console.log("parserAI Adjusted", parserOutput);

        const { output: talkerOutput } = await talkerAI.generate({
            model: gemini15Flash,
            prompt: parserOutput.message,
            input: { schema: parserOutput },
            output: { schema: TalkerSchema },
        });

        console.log("talkerAI Generated", talkerOutput);

        return talkerOutput
    }
)
