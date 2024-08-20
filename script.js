document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        displayCSV(text);
    };
    reader.readAsText(file);
}

function displayCSV(csvText) {
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');

    // Clear previous data
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (rows.length === 0) return;

    // Create header
    const headerCells = rows[0].split(',');
    headerCells.forEach(cell => {
        const th = document.createElement('th');
        th.textContent = cell;
        tableHeader.appendChild(th);
    });

    // Create body rows
    rows.slice(1).forEach(row => {
        const cells = row.split(',');
        const tr = document.createElement('tr');
        cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}
