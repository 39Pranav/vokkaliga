document.addEventListener('DOMContentLoaded', function() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const tbody = document.getElementById('events-tbody');
    const itemsPerPageSelect = document.getElementById('items-per-page');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const pageInfo = document.querySelector('.page-info');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
    let currentEditIndex = -1;

    // Load itemsPerPage from localStorage or default to 1
    let itemsPerPage = parseInt(localStorage.getItem('itemsPerPage')) || 1;
    itemsPerPageSelect.value = itemsPerPage;

    itemsPerPageSelect.addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        localStorage.setItem('itemsPerPage', itemsPerPage); // Save the selected value
        currentPage = 1;
        renderTable();
    });

    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPage < Math.ceil(events.length / itemsPerPage)) {
            currentPage++;
            renderTable();
        }
    });

    function renderTable() {
        tbody.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedEvents = events.slice(start, end);

        paginatedEvents.forEach((event, index) => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${start + index + 1}</td>
                <td>${event.title}</td>
                <td><img src="${event.image}" alt="${event.title}" width="50" height="50"></td>
                <td>${event.description}</td>
                <td>${event.date}</td>
                <td><button class="edit-button">Edit</button></td>
                <td><button class="delete-button">Delete</button></td>
            `;

            tbody.appendChild(tr);
            tr.querySelector('.edit-button').addEventListener('click', function() {
                currentEditIndex = start + index;
                openEditModal(events[currentEditIndex]);
            });

            tr.querySelector('.delete-button').addEventListener('click', function() {
                deleteEvent(start + index);
            });
        });

        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(events.length / itemsPerPage)}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === Math.ceil(events.length / itemsPerPage);

        // Save currentPage to localStorage
        localStorage.setItem('currentPage', currentPage);
    }

    function deleteEvent(index) {
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        renderTable();
    }
    function openEditModal(event) {
        document.getElementById('edit-title').value = event.title;
        document.getElementById('edit-date').value = event.date;
        document.getElementById('edit-description').value = event.description;
        editModal.style.display = 'block';
    }
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('edit-title').value;
        const date = document.getElementById('edit-date').value;
        const description = document.getElementById('edit-description').value;
        const image = document.getElementById('edit-image').files[0];

        if (image) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updateEvent(currentEditIndex, title, date, description, e.target.result);
            };
            reader.readAsDataURL(image);
        } else {
            updateEvent(currentEditIndex, title, date, description, events[currentEditIndex].image);
        }

        editModal.style.display = 'none';
    });
    function updateEvent(index, title, date, description, image) {
        events[index] = { title, date, description, image };
        localStorage.setItem('events', JSON.stringify(events));
        renderTable();
    }

    // Simulate adding a new event
    function addEvent(newEvent) {
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        // Determine if the current page needs to change
        const totalPages = Math.ceil(events.length / itemsPerPage);
        const eventPage = Math.ceil(events.length / itemsPerPage);
        if (currentPage > totalPages) {
            currentPage = totalPages;
        } else if (events.length % itemsPerPage === 1) { // Check if it's a new page
            currentPage = eventPage;
        }

        renderTable();
    }

    // Example usage of addEvent
    

    renderTable();
});
