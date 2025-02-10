document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const resetButton = document.getElementById('reset');

    form.addEventListener('submit', function(event) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            event.preventDefault();
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            event.preventDefault();
        } else {
            displayConfirmationMessage();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function displayConfirmationMessage() {
        alert('Thank you for your message! We will get back to you soon.');
    }
});
