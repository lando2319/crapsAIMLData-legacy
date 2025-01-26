require('dotenv').config({ path: __dirname + '/.env' })

const { gemini15Flash, googleAI, textEmbeddingGecko001 } = require('@genkit-ai/googleai');
const { genkitEval, GenkitMetric } = require('@genkit-ai/evaluator');
const { genkit, z } = require('genkit');

// For referrence this is how I had the testing setup
// Untested, but it initialized

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
