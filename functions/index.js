/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const { onFlow, noAuth } = require("@genkit-ai/firebase/functions");

const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const { googleAI, gemini15Flash, textEmbeddingGecko001 } = require("@genkit-ai/googleai");
const { genkit, z } = require('genkit');

const { defineFirestoreRetriever } = require('@genkit-ai/firebase');

const localSecrets = require("./secrets/secrets.json");

const app = initializeApp();

const firestore = getFirestore(app);

// - connect to onFlow clientside
//  - confirm I'm getting json

// THEN
// - setup the firestore vector stuff
// - setup the firestore update via index stuff


// SPRINT
// Get the full flow 
// app => functions (gen, retrieve, embed, add, return index and json) => app updates doc locally grabbed data



const ai = genkit({
    plugins: [
        googleAI({ apiKey: localSecrets.GOOGLE_GENAI_API_KEY })
    ],
    model: gemini15Flash
})

const ParseSchema = ai.defineSchema(
    'ParseSchema',
    z.object({
        bet_name: z.string(),
        amount: z.number(),
        roll: z.number(),
        rollDie1: z.number(),
        rollDie2: z.number(),
        odds: z.number(),
        point: z.number()
    })
)

const retriever = defineFirestoreRetriever(ai, {
    name: 'questionRetriever',
    firestore,
    collection: 'questions',
    contentField: 'question',
    vectorField: 'embedding',
    embedder: textEmbeddingGecko001,
    distanceMeasure: 'COSINE'
});

exports.parseAnswer = onFlow(
    ai,
    {
        name: "parseAnswer",
        authPolicy: noAuth()
    },
    async (inputData) => {
        try {
            console.log("Incoming Question", inputData);
            var { output: parsedOutput } = await ai.generate({
                model: gemini15Flash,
                prompt: inputData,
                output: { schema: ParseSchema }
            })

            console.log("ai Parsed as", parsedOutput);

            // OFF DURING QA FOR GENKIT

            // console.log("ai retrieving question");
            // const docs = await ai.retrieve({
            //     retriever,
            //     query: inputData,
            //     options: {
            //         limit: 3,
            //         where: { confirmed: true }
            //     },
            // });
            // console.log("ai retrieved question");

            // docs.forEach(doc => {
            //     console.log(doc.content);
            // })

            // console.log("ai successfully retrieved question, embedding question");

            // const embedding = await ai.embed({
            //     embedder: textEmbeddingGecko001,
            //     content: inputData
            // });

            // console.log("ai successfully embedded question, adding to firestore");

            // var dbResponse = await firestore.collection("questions").add({
            //     "question": inputData,
            //     "embedding": FieldValue.vector(embedding),
            //     "parsedOutput": parsedOutput,
            //     "confirmed": true
            // });

            // parsedOutput.firestoreID = dbResponse.id;

            // console.log("ai successfully added question to firestore", parsedOutput.firestoreID);

            return parsedOutput;
        } catch (err) {
            console.error(err)
            return err
        }
    }
)

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

