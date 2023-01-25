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

const querySnapshot = await getDocs(collection(db, "factures"));
const table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
table.innerHTML = '';
querySnapshot.forEach((doc) => {
    let row = table.insertRow();
    let numFactureCell = row.insertCell(0);
    let poidsCell = row.insertCell(1);
    let prixCell = row.insertCell(2);
    let destinationCell = row.insertCell(3);
    let nomClientCell = row.insertCell(4);
    let phoneCell = row.insertCell(5);
    let emailCell = row.insertCell(6);
    let destinataireCell = row.insertCell(7);

    numFactureCell.innerHTML = doc.data().numFacture.toUpperCase();
    poidsCell.innerHTML = doc.data().poids;
    prixCell.innerHTML = doc.data().prix;
    destinationCell.innerHTML = doc.data().destination;
    nomClientCell.innerHTML = doc.data().nom;
    phoneCell.innerHTML = doc.data().phone;
    emailCell.innerHTML = doc.data().email;
    destinataireCell.innerHTML = "";
});


$('#dataTable_filter input').on('keyup', async function () {
    const value = this.value.toLowerCase();
    console.log(value);
    let q = "";
    if (value === "") {

        q = query(collection(db, "factures"));
    }else if (value !== "") {
        
        q = query(collection(db, "factures"), where("numFacture", "<=", value));
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let row = table.insertRow();
        let numFactureCell = row.insertCell(0);
        let poidsCell = row.insertCell(1);
        let prixCell = row.insertCell(2);
        let destinationCell = row.insertCell(3);
        let nomClientCell = row.insertCell(4);
        let phoneCell = row.insertCell(5);
        let emailCell = row.insertCell(6);
        let destinataireCell = row.insertCell(7);

        numFactureCell.innerHTML = doc.data().numFacture.toUpperCase();
        poidsCell.innerHTML = doc.data().poids;
        prixCell.innerHTML = doc.data().prix;
        destinationCell.innerHTML = doc.data().destination;
        nomClientCell.innerHTML = doc.data().nom;
        phoneCell.innerHTML = doc.data().phone;
        emailCell.innerHTML = doc.data().email;
        destinataireCell.innerHTML = "";
    });

});