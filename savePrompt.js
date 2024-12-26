require('dotenv').config({ path: __dirname + '/.env' })

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./secrets/crapsai-72b89-firebase-adminsdk-pnqva-e321c8eecb.json');

const { gemini15Flash, googleAI } = require('@genkit-ai/googleai');
const { textEmbeddingGecko001 } = require('@genkit-ai/googleai');

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

const indexConfig = {
    collection: "questions",
    contentField: "question",
    vectorField: "embedding",
    embedder: textEmbeddingGecko001
};

var question = "What's the bet bet on the table";

(async () => {
    try {

        const embedding = await ai.embed({
            embedder: indexConfig.embedder,
            content: question
        });

        console.log("Got the embeddings");
        console.log(embedding);

        await firestore.collection("questions").add({
            question: question,
            embedding: embedding
        });

        console.log("DONE");
        process.exit(0);
    } catch (e) {
        console.log("Error", e);
        process.exit(1);
    };
})();











// const retriever = defineFirestoreRetriever(ai, {
//   name: 'exampleRetriever',
//   firestore,
//   collection: 'documents',
//   contentField: 'question', 
//   vectorField: 'embedding', 
//   embedder: yourEmbedderInstance, 
//   distanceMeasure: 'COSINE'
// });

        // const docs = await ai.retrieve({
        //     retriever,
        //     query: 'search query',
        //     options: {
        //         limit: 5,
        //         where: { confirmed: true }
        //     },
        // });

        // docs.forEach(element => {
        //     console.log("Element", element);
        // });