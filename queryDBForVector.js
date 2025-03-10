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

function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

var question = "What's the best value bet on the table";
// var question = "How much does a $12 Horn Bet pay if 12 rolls";
// var question = "there once was a sentence that didn't relate to anything else and was deemed to be too different";

(async () => {
    try {
        const docs = await ai.retrieve({
            retriever,
            query: question,
            options: {
                limit: 1,
                where: { confirmed: true },
                // k: 10, // These seem to do very little
                // preRerankK: 10,
                // scoreThreshold: 0
            },
        });

        const queryEmbedding = await ai.embed({
            embedder: textEmbeddingGecko001,
            content: question
        });

        var doc = docs[0];

        const candidateText = doc.content.map(c => c.text).join(" ");
        const candidateEmbedding = await ai.embed({
            embedder: textEmbeddingGecko001,
            content: candidateText
        });

        const similarity = cosineSimilarity(queryEmbedding, candidateEmbedding);
        console.log("Candidate Text:", candidateText);
        console.log("Similarity:", similarity);

        console.log("CrapsAI Says:");
        console.log(doc.metadata.answer);

        console.log("DONE");
        process.exit(0);
    } catch (e) {
        console.log("Error", e);
        process.exit(1);
    };
})();