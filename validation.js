// validation.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Get the form element by its ID
    const form = document.getElementById('myForm'); 

    // 2. Attach the event listener for submission
    form.addEventListener('submit', function(event) {
        // Run the validation function
        if (validateForm() === false) {
            // Stop the form submission if validation fails
            event.preventDefault(); 
        }
    });
});

function validateForm()  {
    //starting the form assumption is valid
    let isValid = true;

    // This is to prevent old error messages from lingering after a fix, creating an empty state.
    document.getElementById('fNameError').textContent = '';
    document.getElementById('lNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneNumberError').textContent = '';
    document.getElementById('eircodeError').textContent = '';

    // Get form field values
    const firstName = document.getElementById('fName').value.trim();  
    const lastName = document.getElementById('lName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const eircode = document.getElementById('eircode').value.trim();

    //Regex
    const alphaRegex = /^[a-zA-Z0-9]+$/


    if(firstName.length > 20 || !alphaRegex.test(firstName)){
        fNameError.textContent = "It should only contain 20 characters and be Alphanumberic.";
        isValid = false;
    }

    if(lastName.length > 20 || !alphaRegex.test(lastName)){
        lNameError.textContent = "It should only contain 20 characters and be Alphanumberic.";
        isValid = false;
    }

}