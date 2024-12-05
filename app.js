const cargoList = [
    {
        id: "CARGO001",
        name: "Строительные материалы",
        status: "В пути",
        origin: "Москва",
        destination: "Казань",
        departureDate: "2024-11-24"
    },
    {
        id: "CARGO002",
        name: "Хрупкий груз",
        status: "Ожидает отправки",
        origin: "Санкт-Петербург",
        destination: "Екатеринбург",
        departureDate: "2024-11-26"
    }
];

function renderCargoList() {
    const cargoTableBody = document.getElementById('cargoTableBody');
    cargoTableBody.innerHTML = '';

    cargoList.forEach(cargo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cargo.id}</td>
            <td>${cargo.name}</td>
            <td class="${getStatusClass(cargo.status)}">${cargo.status}</td>
            <td>${cargo.origin}</td>
            <td>${cargo.destination}</td>
            <td>${cargo.departureDate}</td>
            <td>
                <select class="custom-select" onchange="updateStatus('${cargo.id}', this.value)">
                    <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? 'selected' : ''}>Ожидает отправки</option>
                    <option value="В пути" ${cargo.status === "В пути" ? 'selected' : ''}>В пути</option>
                    <option value="Доставлен" ${cargo.status === "Доставлен" ? 'selected' : ''}>Доставлен</option>
                </select>
            </td>
        `;
        cargoTableBody.appendChild(row);
    });
}

function getStatusClass(status) {
    switch(status) {
        case 'Ожидает отправки':
            return 'status-awaiting';
        case 'В пути':
            return 'status-in-transit';
        case 'Доставлен':
            return 'status-delivered';
    }
}

function updateStatus(id, newStatus) {
    const cargo = cargoList.find(c => c.id === id);
    const departureDate = new Date(cargo.departureDate);
    const today = new Date();

    if (newStatus === 'Доставлен' && departureDate > today) {
        alert("Ошибка: Нельзя установить статус 'Доставлен', если дата отправления находится в будущем.");
        renderCargoList();
    } else {
        cargo.status = newStatus;
        renderCargoList();
    }
}

document.getElementById('cargoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('cargoName').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;

    if (!name || !origin || !destination || !departureDate) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    const newCargo = {
        id: `CARGO00${cargoList.length + 1}`,
        name: name,
        status: "Ожидает отправки",
        origin: origin,
        destination: destination,
        departureDate: departureDate
    };

    cargoList.push(newCargo);
    renderCargoList();

    document.getElementById('cargoForm').reset();
});

renderCargoList();