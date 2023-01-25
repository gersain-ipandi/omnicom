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

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'fr',
        defaultView: 'month',
        events: async function (info, successCallback, failureCallback) {
            var events = [];
            // Récupération des événements à partir de Firestore ici
            const querySnapshot = await getDocs(collection(db, "planings"));

            querySnapshot.forEach((doc) => {
                events.push({
                    title: 'Livraison',
                    start: doc.data().dateDepart,
                    end: doc.data().dateDepart,
                    lieuDepart: 'ffsddsd'
                });
            });

            // Ajoutez les événements récupérés à la variable events
            return events;
        },
        eventRender: function (event, element) {
            element.append("<p>"+event.lieuDepart+"</p>");
        },
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        droppable: true,
        eventLimit: true,
        selectable: true,
        selectHelper: true,
        /* select: function (start, end) {
            var title = prompt('Event Title:');
            var eventData;
            if (title) {
                eventData = {
                    title: title,
                    start: start,
                    end: end
                };
                calendar.addEvent(eventData);
            }
            calendar.unselect();
        },
        eventDrop: function (event) {
            alert(event.title + " was dropped on " + event.start.toISOString());
        },
        eventResize: function (event) {
            alert(event.title + " end is now " + event.end.toISOString());
        } */
    });

    calendar.render();
});
