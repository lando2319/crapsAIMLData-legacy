require('dotenv').config({ path: __dirname + '/.env' })

const { gemini15Flash, googleAI, textEmbeddingGecko001 } = require('@genkit-ai/googleai');
// const { vertexAI, textEmbedding004 } = require('@genkit-ai/vertexai');

const { genkit } = require('genkit');

const ai = genkit({
    plugins: [
        // vertexAI({
        //     location: 'us-central1'
        // }),
        googleAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY
        })
    ],
    model: gemini15Flash
});

(async () => {
    try {
        const embedding = await ai.embed({
            // embedder: textEmbedding004,
            embedder: textEmbeddingGecko001,
            content: "What's the best bet on the table"
        });

        console.log("Got the embeddings");
        console.log(embedding);

        console.log("DONE");
        process.exit(0);
    } catch (e) {
        console.log("Error", e);
        process.exit(1);
    };
})();