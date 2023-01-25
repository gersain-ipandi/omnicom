var express = require('express');
var router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccountKey.json");

const db = admin.firestore();

/* GET users listing. */
router.post('/login', (req, res) => {
    console.log('Requette recu');
    let email = req.body.email;
    let password = req.body.password;

    if (email === "" || password === "") {
        res.status(400).send("Please fill all the fields");
    } else {
        // Compare email and password with predefined values
        let predefinedEmail = 'admin@omnicom.ga';
        let predefinedPassword = 'admin2023';
        if (email === predefinedEmail && password === predefinedPassword) {
            res.status(200).render('./admin/factures');
        } else {
            res.status(401).send("Identifiants invalides");
        }
    }
});

router.post('/ajout-planing', function (req, res, next) {
    let { dateDepart, lieuDepart, destination, numVehicule, nomChauffeur } = req.body;
    console.log('Requette recu');
    console.log(req.body);

    if (!dateDepart || !lieuDepart || !destination || !numVehicule || !nomChauffeur) {
        res.status(501).json({ msg: "Une ou plusieurs données sont manquantes" });
        return;
    }


    db.collection("planings").doc().set(req.body)
        .then(() => {
            res.status(201).json({ msg: "Votre enregistrement a été effectuer avec succes" });
        })
        .catch((err) => {
            res.status(500).json({ msg: "Une erreur est survenue lors de l'enregistrement" });
        });
});

/* GET users listing. */
router.get('/factures', (req, res) => {
    res.status(200).render('./admin/factures');
});

router.get('/planings', (req, res) => {
    res.status(200).render('./admin/planings');
});

router.get('/ajout_planing', (req, res) => {
    res.status(200).render('./admin/ajout-planing');
});

module.exports = router;
