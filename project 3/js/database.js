// Firebase configuration and database utilities
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCcr9tC_tYqaRfMCsJ1AuLxWfgBgOKj43s",
    authDomain: "trial-58b78.firebaseapp.com",
    databaseURL: "https://trial-58b78-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trial-58b78",
    storageBucket: "trial-58b78.firebasestorage.app",
    messagingSenderId: "437171267528",
    appId: "1:437171267528:web:fd339ebec974015a4b02fd",
    measurementId: "G-V507ZTQCRW"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

export function subscribeToPolesData(callback) {
    const polesRef = ref(database, 'poles');
    onValue(polesRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const poles = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            callback(poles);
        }
    });
}