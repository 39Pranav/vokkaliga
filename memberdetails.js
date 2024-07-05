document.addEventListener('DOMContentLoaded', () => {
    try {
        // Retrieve selected member ID from localStorage
        const selectedMemberId = localStorage.getItem('selectedMemberId');
        if (!selectedMemberId) {
            throw new Error('Selected member ID not found.');
        }

        // Use the retrieved member ID in the API endpoint
        fetch(`https://vocapbkendsvc.azurewebsites.net/api/admin/member/${selectedMemberId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => populateForm(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle error scenario here (e.g., display an error message)
            });
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error scenario here (e.g., display an error message)
    }
});

function populateForm(data) {
    // document.querySelector(`[name="resident-type"][value="${data.residentType}"]`).checked = true;
    document.getElementById('first-name').value = data.Data.Personal.FirstName;
    document.getElementById('last-name').value = data.Data.Personal.LastName;
    document.getElementById('email').value = data.Data.Personal.EmailAddress;
    document.getElementById('phone-number').value = data.Data.Personal.MobileNumber;
    document.getElementById('gender').value = data.Data.Personal.Gender;
    document.getElementById('hobbies').value = data.Data.Personal.Hobby;
    document.getElementById('dob').value = data.Data.Personal.DateOfBirth;
    document.getElementById('blood-group').value = data.Data.Personal.BloodGroup;
    document.querySelector(`[name="gender"][value="${data.Data.Personal.Gender}"]`).checked = true;
    document.getElementById('')
    document.getElementById('current-address').value = data.currentAddress;
    document.getElementById('native-place').value = data.nativePlace;
    document.getElementById('permanent-address').value = data.permanentAddress;
    document.getElementById('village').value = data.village;
    document.getElementById('district').value = data.district;
    document.getElementById('state').value = data.state;
    document.getElementById('country').value = data.country;
    document.getElementById('pin-code').value = data.pinCode;

    document.getElementById('occupation-type').value = data.occupation;
    document.getElementById('income').value = data.income;
    document.getElementById('work-address').value = data.workAddress;
    document.getElementById('working-hours').value = data.workingHours;
    document.getElementById('holiday').value = data.holiday;
    document.getElementById('marital-status').value = data.maritalStatus;
}

function showSection(sectionId) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`#${sectionId}`).classList.add('active');

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.tab-button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

function showProfile() {
    document.getElementById('profile-modal').style.display = 'block';
}

function closeProfile() {
    document.getElementById('profile-modal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('profile-modal')) {
        document.getElementById('profile-modal').style.display = 'none';
    }
}   