var express = require('express');
var router = express.Router();
const admin = require('firebase-admin');
const shortid = require('shortid');
// import service account file (helps to know the firebase project details)
const serviceAccount = require("../serviceAccountKey.json");

// Intialize the firebase-admin project/account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


/* GET demande devis page. */


router.post('/enregistrement-paiement', function (req, res, next) {
    let { nom, email, phone, poids, destination, description } = req.body;
    console.log('Requette recu');

    if (!nom || !email || !phone || !poids || !destination || !description) {
        res.status(501).json({ msg: "Une ou plusieurs données sont manquantes" });
        return;
    }

    let prix = poids * 300;
    req.body.prix = prix;

    let numFacture = shortid.generate().substring(0,4) + '-'+ shortid.generate().substring(0,4) + '-'+ shortid.generate().substring(0,4);
    req.body.numFacture = numFacture;
    db.collection("factures").doc().set(req.body)
        .then(() => {
            res.status(201).json({ msg: "Votre enregistrement a été effectuer avec succes" });
        })
        .catch((err) => {
            res.status(500).json({ msg: "Une erreur est survenue lors de l'enregistrement" });
        });
});

module.exports = router;