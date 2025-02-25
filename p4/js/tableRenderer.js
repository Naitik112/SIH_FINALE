export function renderFaultTable(faults, table, type) {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Clear previous table rows

    if (faults.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">No faults found</td></tr>';
        return;
    }

    faults.forEach(fault => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fault.id}</td>
            <td>${fault.lng } ${fault.lat}</td>
            <td>${fault.leakCurrent.toFixed(3)}</td>
            <td>${fault.EarthingContinuity === 1 ? 'Healthy' : 'Faulty'}</td>
            <td>${fault.EarthingResistance.toFixed(2)}</td>
            <td>${new Date(Date.now()).toLocaleDateString()}</td>
            <td><button class="details-btn">Details</button></td>
        `;
        tbody.appendChild(row);
    });
}
