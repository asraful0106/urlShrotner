// Get modal container and button elements
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContainer = document.getElementById('modal-container');
const form = document.getElementById('formContainer');
const inputField = document.getElementById('default-search');

const modalInfo = document.getElementById('modalInfo');
const modaLoading = document.getElementById('modaLoading');
const modalError = document.getElementById('modalError');
const formResult = document.getElementById('formResult');

var isLoding = false;
var response = '';

// Event listener for opening the modal
openModalBtn?.addEventListener('click', () => {
    modalContainer.style.display = 'flex';
});

// Event listener for closing the modal
closeModalBtn?.addEventListener('click', () => {
    inputField.value = '';
    modalContainer.style.display = 'none';
});

// Modal loading and error showing logic
function showLoading() {
    modaLoading.style.display = 'flex';
    modalInfo.style.display = 'none';
    modalError.style.display = 'none';
};
function showInfo(url){
    modaLoading.style.display = 'none';
    formResult.innerText = url;
    modalInfo.style.display = 'block';
    modalError.style.display = 'none';
};
function showError(err){
    modaLoading.style.display = 'none';
    modalInfo.style.display = 'none';
    modalError.innerHTML = `<h3>${err}</h3>`;
    modalError.style.display = 'block';
}

// Creating a function to send the data to the server
async function sendData(fromData) {
    showLoading();
    const site_url = 'http://localhost:3000';
    const url = 'http://localhost:3000/create';
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl: fromData })
        });

        // Make sure the response is OK
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        // Storing the response on the response variable
        response = await res.json();
        // Showing the response on the modal
        showInfo(`${site_url}/${response.shortenedUrl}`);
        // console.log('Response: ', response);
    } catch (err) {
        // console.log("Error: ", err);
        showError(err);
    }
}


// Controm the form
const submitFrom = (e) => {
    e.preventDefault();
    const formValue = inputField.value;
    sendData(formValue);
    // console.log(formValue);
}

// Add an event listener to the form
form?.addEventListener('submit', submitFrom);


function copyText() {
    const textToCopy = document.querySelector('.modalTextContainer > p').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        // alert("Text copied to clipboard!"); 

        // Add a temporary class to show feedback
        const container = document.querySelector('.modalTextContainer');
        container.classList.add('copied');

        // Remove the 'copied' class after 2 seconds to reset the icon color
        setTimeout(() => {
            container.classList.remove('copied');
        }, 2000);
    });
}
