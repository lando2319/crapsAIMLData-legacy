require('dotenv').config({ path: __dirname + '/.env' })

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./secrets/crapsai-72b89-firebase-adminsdk-pnqva-e321c8eecb.json');

const { gemini15Flash, googleAI } = require('@genkit-ai/googleai');
const { vertexAI, textEmbedding004 } = require('@genkit-ai/vertexai');

const { genkit } = require('genkit');

// THIS FILE IS NOT WORKING
// PERMISSION ISSUE, SEE STATUS.MD and Stackoverflow

const ai = genkit({
    plugins: [
        vertexAI({
            location: "us-central1"
        }),
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

const indexConfig = {
    collection: "questions",
    contentField: "question",
    vectorField: "embedding",
    embedder: textEmbedding004
};

var question = "What's the best bet on the table";

(async () => {
    try {

        const embedding = await ai.embed({
            embedder: indexConfig.embedder,
            content: question
        });

        console.log("Got the embeddings");
        console.log(embedding);

        // await firestore.collection("questions").add({
        //     question: question,
        //     embedding: FieldValue.vector(embedding)
        // });

        console.log("DONE");
        process.exit(0);
    } catch (e) {
        console.log("Error", e);
        process.exit(1);
    };
})();