/* designapp.js */
function showSection(section) {
    // Hide all sections
    document.getElementById('personal-form').style.display = 'none';
    document.getElementById('address-form').style.display = 'none';
    document.getElementById('occupation-form').style.display = 'none';
    // Show selected section
    if (section === 'personal') {
        document.getElementById('personal-form').style.display = 'flex';
    } else if (section === 'address') {
        document.getElementById('address-form').style.display = 'flex';
    } else if (section === 'occupation') {
        document.getElementById('occupation-form').style.display = 'flex';
    }
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add active class to the clicked button
    document.querySelector(`.tab-button[onclick="showSection('${section}')"]`).classList.add('active');

    // Show or hide the BACK link based on the active tab
    const backLink = document.getElementById('back-link');
    if (section === 'personal') {
        backLink.style.display = 'block';
    } else {
        backLink.style.display = 'none';
    }
}

function showNextSection() {
    const currentForm = document.querySelector('main form:not([style*="display: none"])');
    if (currentForm.id === 'personal-form') {
        showSection('address');
    } else if (currentForm.id === 'address-form') {
        showSection('occupation');
    }
}
function direct(){
    window.location.href = "dashboard.html";
}
