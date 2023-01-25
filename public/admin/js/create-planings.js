// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, query, where, } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-myYjJj9SiLCb3ASX_O_nUf4B0TqVYfI",
    authDomain: "omnicon-plus.firebaseapp.com",
    projectId: "omnicon-plus",
    storageBucket: "omnicon-plus.appspot.com",
    messagingSenderId: "908973867525",
    appId: "1:908973867525:web:294b88bea2fe7055fe526c",
    measurementId: "G-S63B8MNVYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



/* Ajout de planing */
let form = document.querySelector('.wpcf7-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check required fields
    let requiredFields = form.querySelectorAll('.wpcf7-validates-as-required');
    let valid = true;
    requiredFields.forEach(field => {
        if (!field.value) {
            field.classList.add('wpcf7-not-valid');
            valid = false;
        } else {
            field.classList.remove('wpcf7-not-valid');
        }
    });

    if (!valid) {
        // Display an error message
        swal("Erreur!", "Veuillez remplir tous les champs!", "error");
        return;
    }

    let fieldValues = {};
    requiredFields.forEach(field => {
        fieldValues[field.name] = field.value;
    });

    // Submit the form
    console.log("Envoi formulaire");
    console.log(fieldValues);

    axios({
        method: 'post',
        url: '/admin/ajout-planing',
        data: fieldValues
    })
        .then((response) => {
            // Handle successful submission
            console.log(response);
            if (response.status === 201) {
                swal("Félicitations!", "Enregistrement effectuer avec succes", "success");
            }
            if (response.status === 501) {
                swal("Erreur!", "Une ou plusieurs données sont manquantes, veuillez renseigner tous les champs", "error");
            }
            if (response.status === 500) {
                swal("Erreur!", "Une erreur est survenue lors de l'enregistrement", "error");
            }

        })
        .catch((error) => {
            // Handle error
            console.log(error);
        });
});
