const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('./dbFirebase/juan-14bd5-firebase-adminsdk-3g8q6-799b540683.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//exporto la db para poder usarla en server.js
module.exports = db;