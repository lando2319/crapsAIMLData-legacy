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
        and_down_payout: z.number(),
        bet_name: z.string()
    })
)

const InputSchema = ai.defineSchema(
    'InputSchema',
    z.object({
        message: z.string()
    })
)