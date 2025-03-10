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
var postProcess = require("./util/postProcess.js")

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

exports.parseQuestion = onFlow(
    ai,
    {
        name: "parseAnswer",
        authPolicy: noAuth()
    },
    async (inputData) => {
        try {
            console.log("Starting Process: Incoming Question", inputData);

            console.log("embedding question");
            const embedding = await ai.embed({
                embedder: textEmbeddingGecko001,
                content: inputData
            });

            console.log("successfully embedded question, retrieving question from vector database");

            const docs = await ai.retrieve({
                retriever,
                query: inputData,
                options: {
                    limit: 1,
                    where: { confirmed: true }
                },
            });

            console.log("successfully retrieved question from vector database");

            if (docs.length > 0) {
                var doc = docs[0];

                console.log("embedding the text from the vectorDB result");
                const candidateText = doc.content.map(c => c.text).join(" ");
                const candidateEmbedding = await ai.embed({
                    embedder: textEmbeddingGecko001,
                    content: candidateText
                });
                console.log("Successfully embedded the text from the vectorDB result, checking similarity");

                const similarity = cosineSimilarity(embedding, candidateEmbedding);

                console.log("Candidate Text:", candidateText);
                console.log("Similarity:", similarity);

                var matcheText = "";
                if (similarity > 0.9) {
                    matcheText = "OVER THRESHOLD";
                }

                console.log(matcheText, "VectorDB Says:", doc.metadata?.answer);

                // READY TO TURN ON, clientside will show 'answers'
                // return buildVectorResponseData(doc.metadata)
            }

            console.log("Parsing question with ai.generate");
            var { output: parsedOutput } = await ai.generate({
                model: gemini15Flash,
                prompt: inputData,
                output: { schema: ParseSchema }
            })

            console.log("Successfully Parsed question as", parsedOutput);

            console.log("Cleaning Data");
            var cleanData = postProcess.run(inputData, parsedOutput, "postProcess");
            console.log("Successfully Cleaned Data as", cleanData);

            console.log("Adding question to firestore");

            var dbResponse = await firestore.collection("questions").add({
                "question": inputData,
                "embedding": FieldValue.vector(embedding),
                "parsedOutput": parsedOutput,
                "cleanedOutput": cleanData
            });

            cleanData.firestoreID = dbResponse.id;

            console.log("Successfully added question to firestore", cleanData.firestoreID);

            console.log("Finished Process Returning cleanData");

            cleanData.answers = [];
            cleanData.supportImages = [];
            cleanData.followupQuestions = [];

            return cleanData;
        } catch (err) {
            console.error(err)
            return err
        }
    }
)

function buildVectorResponseData(vectorData) {
    var data = {
        bet_name: "",
        amount: 0,
        roll: 0,
        rollDie1: 0,
        rollDie2: 0,
        odds: 0,
        point: 0
    }

    data.answers = vectorData.answers;
    data.supportImages = vectorData.supportImages;
    data.followupQuestions = vectorData.followupQuestions;

    return data
}

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.parseQuestionClean = onFlow(
    ai,
    {
        name: "parseQuestionClean",
        authPolicy: noAuth()
    },
    async (inputData) => {
        try {
            console.log("Starting Process: Incoming Question", inputData);
            console.log("Parsing question with ai.generate");
            var { output: parsedOutput } = await ai.generate({
                model: gemini15Flash,
                prompt: inputData,
                output: { schema: ParseSchema }
            })

            console.log("Successfully Parsed question as", parsedOutput);

            console.log("Cleaning Data");
            var cleanData = postProcess.run(inputData, parsedOutput, "postProcess");
            console.log("Successfully Cleaned Data as", cleanData);

            console.log("Finished Process Returning cleanData");
            return cleanData;
        } catch (err) {
            console.error(err)
            return err
        }
    }
)

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
