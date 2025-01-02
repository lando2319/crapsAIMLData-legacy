/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const { onFlow, noAuth } = require("@genkit-ai/firebase/functions");

const { initializeApp } = require('firebase-admin/app');

const { googleAI, gemini15Flash } = require("@genkit-ai/googleai");

const { genkit, z } = require('genkit');

const localSecrets = require("./secrets/secrets.json");


// LEFT OFF HERE
// Get this deployed 100%

// - run the deployment command
// - see if I can hit it with postman live
// - connect to onFlow clientside
//  - confirm I'm getting json

// DONE
// - try and hit it locally with postman


initializeApp({
    projectId: 'crapsai-72b89',
});

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
        roll: z.number()
    })
)

exports.parseAnswer = onFlow(
    ai,
    {
        name: "parseAnswer",
        authPolicy: noAuth()
    },
    async (inputData) => {
        console.log("GOT THAT INPUT");
        console.log(inputData);
        const { output: parsedOutput } = await ai.generate({
            model: gemini15Flash,
            prompt: inputData,
            output: { schema: ParseSchema }
        })

        console.log("ai Generated", parsedOutput);

        return parsedOutput;
    }
)

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

