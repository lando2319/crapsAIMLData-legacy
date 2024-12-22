require('dotenv').config({ path: __dirname + '/.env' })

const { gemini15Flash, googleAI, textEmbeddingGecko001 } = require('@genkit-ai/googleai');
const { genkitEval, GenkitMetric } = require('@genkit-ai/evaluator');
const { genkit, z } = require('genkit');

const ai = genkit({
    plugins: [
        googleAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY
        }),
        genkitEval({
            judge: gemini15Flash,
            metrics: [
                GenkitMetric.ANSWER_RELEVANCY,
                GenkitMetric.FAITHFULNESS,
                GenkitMetric.MALICIOUSNESS
            ],
            embedder: textEmbeddingGecko001
        })
    ],
    model: gemini15Flash
});

const BetSchema = ai.defineSchema(
    'BetSchema',
    z.object({
        headline: z.string(),
        bet_details: z.string(),
        amount: z.number(),
        full_payout: z.number(),
        still_up_payout: z.number(),
        bet_name: z.string()
    })
)

const InputSchema = ai.defineSchema(
    'InputSchema',
    z.object({
        message: z.string()
    })
)


exports.mainFlow = ai.defineFlow(
    {
        name: 'mainFlow',
        // inputSchema: InputSchema, // OFF FOR NOW, confirm it works in dash
        outputSchema: BetSchema
    },
    async (inputData) => {
        const { output } = await ai.generate({
            model: gemini15Flash,
            prompt: inputData,
            output: { schema: BetSchema }
        })

        if (output == null) {
            throw new Error("Response doesn't satisfy schema");
        }
        return output
    }
)

// WORKS WITH ONE OFF PROMPT
exports.simpleFlow = ai.defineFlow(
    {
        name: 'simpleFlow',
    },
    async (inputData) => {
        const { text } = await ai.generate({
            model: gemini15Flash,
            prompt: inputData
        });

        return text;
    }
)

