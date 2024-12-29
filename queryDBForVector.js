require('dotenv').config({ path: __dirname + '/.env' })

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./secrets/crapsai-72b89-firebase-adminsdk-pnqva-e321c8eecb.json');

const { gemini15Flash, googleAI, textEmbeddingGecko001 } = require('@genkit-ai/googleai');

const { defineFirestoreRetriever } = require('@genkit-ai/firebase');

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

const retriever = defineFirestoreRetriever(ai, {
    name: 'questionRetriever',
    firestore,
    collection: 'questions',
    contentField: 'question',
    vectorField: 'embedding',
    embedder: textEmbeddingGecko001,
    distanceMeasure: 'COSINE'
});

var question = "this thing also went boom over here";

(async () => {
    try {
        const docs = await ai.retrieve({
            retriever,
            query: question,
            options: {
                limit: 3,
                where: { confirmed: true },
                // k: 2, // These seem to do very little
                // preRerankK: 4,
                // scoreThreshold: 1
            },
        });

        docs.forEach(doc => {
            console.log(doc);
        })

        console.log("DONE");
        process.exit(0);
    } catch (e) {
        console.log("Error", e);
        process.exit(1);
    };
})();