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

const ParseSchema = parserAI.defineSchema(
    'ParseSchema',
    z.object({
        bet_name: z.string(),
        amount: z.number(),
        roll: z.number()
    })
)

exports.mainFlow = parserAI.defineFlow(
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

        return parserOutput
    }
)
