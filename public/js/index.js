// Get modal container and button elements
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContainer = document.getElementById('modal-container');
const form = document.getElementById('formContainer');


// Event listener for opening the modal
openModalBtn.addEventListener('click', () => {
    modalContainer.style.display = 'flex';
});

// Event listener for closing the modal
closeModalBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});


// Controm the form
const submitFrom = (e) => {
    console.log("event", e);
    e.preventDefault();
}

// Add an event listener to the form
form.addEventListener('submit', submitFrom);


function copyText() {
    const textToCopy = document.querySelector('.modalTextContainer > p').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Text copied to clipboard!"); // You can replace this with a more subtle feedback like changing icon color or text.

        // Add a temporary class to show feedback
        const container = document.querySelector('.modalTextContainer');
        container.classList.add('copied');

        // Remove the 'copied' class after 2 seconds to reset the icon color
        setTimeout(() => {
            container.classList.remove('copied');
        }, 2000);
    });
}
