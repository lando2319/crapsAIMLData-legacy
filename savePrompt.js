require('dotenv').config({ path: __dirname + '/.env' })

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./secrets/crapsai-72b89-firebase-adminsdk-pnqva-e321c8eecb.json');

const { gemini15Flash, googleAI, textEmbeddingGecko001 } = require('@genkit-ai/googleai');

const { genkit } = require('genkit');

const ai = genkit({
    plugins: [
        googleAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY
        })
    ],
    model: gemini15Flash
});

const app = initializeApp({
    credential: cert(serviceAccount)
});

const firestore = getFirestore(app);

var question = "What's the greatest bet on the table";

(async () => {
    try {

        const embedding = await ai.embed({
            embedder: textEmbeddingGecko001,
            content: question
        });

        console.log("Got the embeddings");
        console.log(embedding);

        await firestore.collection("questions").add({
            "question": question,
            "embedding": FieldValue.vector(embedding),
            "confirmed": true
        });

        console.log("DONE");
        process.exit(0);
    } catch (e) {
        console.log("Error", e);
        process.exit(1);
    };
})();
