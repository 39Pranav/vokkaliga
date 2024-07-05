document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push({
            title,
            date,
            description,
            image: e.target.result
        });

        localStorage.setItem('events', JSON.stringify(events));
        window.location.href = 'events.html';
    };

    if (image) {
        reader.readAsDataURL(image);
    } else {
        reader.onload();
    }
});
