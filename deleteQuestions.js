require('dotenv').config({ path: __dirname + '/.env' })

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./secrets/crapsai-72b89-firebase-adminsdk-pnqva-e321c8eecb.json');

const app = initializeApp({
    credential: cert(serviceAccount)
});

const firestore = getFirestore(app);





// I hope you know what you're doing
process.exit(0);





(async () => {
    try {
        var snapshot = await firestore.collection("questions").get();
        
        for (var doc of snapshot.docs) {
            console.log("Deleting doc", doc.id);
            await firestore.collection("questions").doc(doc.id).delete();
            console.log("Successfully Deleted doc", doc.id);
        }

        console.log("DONE");
        process.exit(0);
    } catch (e) {
        console.log("Error", e);
        process.exit(1);
    };
})();
