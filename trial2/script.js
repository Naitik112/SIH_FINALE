// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration (replace with your own config values)
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
    const LEAK_CURRENT_THRESHOLD = 0.160; // Example threshold for leakage current
    const RESISTANCE_THRESHOLD = 5; // Example threshold for earthing resistance

    let allPoles = [];
    let currentFilter = 'all'; // Default filter

    // Initialize map
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Center map over India
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

    // Function to fetch poles data from Firebase
    function fetchPolesData(callback) {
        const polesRef = ref(database, 'poles');
        onValue(polesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const polesArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                allPoles = polesArray;
                updateDisplay();
                addMarkersToMap(polesArray); // Ensure this is called after updating allPoles
                if (callback) {
                    callback(polesArray);
                }
            } else {
                console.log("No data available");
                if (callback) {
                    callback([]);
                }
            }
        });
    }

    function addMarkersToMap(polesArray) {
        polesArray.forEach((pole) => {
            const latitude = pole.lat; // Extract latitude
            const longitude = pole.lag; // Extract longitude
    
            // Check if latitude and longitude are valid
            if (latitude && longitude) {
                L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup(`Pole ID: ${pole.id}`); // Add popup with pole ID
            }
        });
    }

    // Call this function to update the grid and fault counts
    function updateDisplay() {
        const polesGrid = document.getElementById('polesGrid');
        if (!polesGrid) {
            console.error('polesGrid element not found!');
            return;
        }

        const filteredPoles = currentFilter === 'all' ? allPoles : allPoles.filter(hasFault);

        polesGrid.innerHTML = filteredPoles.map((pole, index) => `
            <div class="pole-card ${hasFault(pole) ? 'has-fault' : ''}" 
                 style="animation: slideUp 0.3s ease-out ${index * 0.1}s forwards"
                 data-pole-id="${pole.id}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3>Pole ${pole.id}</h3>
                    ${hasFault(pole) ? '<span style="background: #fee2e2; color: #ef4444; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem;">Fault Detected</span>' : ''}
                </div>
                <div class="measurement">
                    <span>Earthing Continuity</span>
                    <span class="${pole.EarthingContinuity === 0 ? 'value-fault' : 'value-normal'}">
                        ${pole.EarthingContinuity === 1 ? 'Connected' : 'Disconnected'}
                    </span>
                </div>
                <div class="measurement">
                    <span>Leak Current</span>
                    <span class="${pole.leakCurrent > LEAK_CURRENT_THRESHOLD ? 'value-fault' : 'value-normal'}">
                        ${pole.leakCurrent.toFixed(3)} mA
                    </span>
                </div>
                <div class="measurement">
                    <span>Earthing Resistance</span>
                    <span class="${pole.EarthingResistance > RESISTANCE_THRESHOLD ? 'value-fault' : 'value-normal'}">
                        ${pole.EarthingResistance.toFixed(1)} Ω
                    </span>
                </div>
            </div>
        `).join('');

        // Attach event listener for each Pole Card
        document.querySelectorAll('.pole-card').forEach(card => {
            card.addEventListener('click', () => {
                const poleId = card.getAttribute('data-pole-id');
                if (poleId) {
                    window.location.href = `./earthing-faults.html?id=${poleId}`;
                }
            });
        });

        // Update fault counts
        updateFaultCounts();
    }

    // Function to check if a pole has a fault
    function hasFault(pole) {
        return pole.EarthingContinuity === 0 ||
            pole.leakCurrent > LEAK_CURRENT_THRESHOLD ||
            pole.EarthingResistance > RESISTANCE_THRESHOLD;
    }

    // Update fault counts dynamically
    function updateFaultCounts() {
        const earthingFaults = allPoles.filter(pole => pole.EarthingContinuity === 0).length;
        const leakageFaults = allPoles.filter(pole => pole.leakCurrent > LEAK_CURRENT_THRESHOLD).length;
        const resistanceFaults = allPoles.filter(pole => pole.EarthingResistance > RESISTANCE_THRESHOLD).length;

        document.getElementById('earthingFaults').textContent = earthingFaults;
        document.getElementById('leakageFaults').textContent = leakageFaults;
        document.getElementById('resistanceFaults').textContent = resistanceFaults;
    }

    // Event listeners for filter buttons
    document.getElementById('showAll').addEventListener('click', () => {
        currentFilter = 'all';
        updateDisplay();
    });

    document.getElementById('showFaults').addEventListener('click', () => {
        currentFilter = 'faults';
        updateDisplay();
    });

    // Attach event listener for fault summary cards
    document.querySelectorAll('.fault-card').forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = '../project 3/earthing-faults.html';
        });
    });

    // Initial fetch
    fetchPolesData();
});
