// EventListener method to understand and works the form inside the HTML

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

    // Variables to get form field values
    const firstName = document.getElementById('fName').value.trim();  
    const lastName = document.getElementById('lName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const eircode = document.getElementById('eircode').value.trim();

    //Regex Format
    const alphaRegex = /^[a-zA-Z]+$/ //check for alphanumeric characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //check email formart
    const phoneNumberRegex = /^\d{10}$/; // check 10 numeric digits
    const eircodeRegex = /^[dD][a-zA-Z0-9]{6}$/; //check the first digit D and then more 6 alphanumeric characters

    //All validation using if to check everything first before allowing the submit buttom
    if(firstName.length > 20 || !alphaRegex.test(firstName)){
        fNameError.textContent = "It should only contain 20 characters and be Alphanumberic.";
        isValid = false;
    }

    if(lastName.length > 20 || !alphaRegex.test(lastName)){
        lNameError.textContent = "It should only contain 20 characters and be Alphanumberic.";
        isValid = false;
    }

    if(email.length === 0 || !emailRegex.test(email)){ //=== means it won't change the data type before comparing
        emailError.textContent = "It needs to be in a email formart. Can't be empty!";
        isValid = false;
    }

    if(!phoneNumberRegex.test(phoneNumber)){
        phoneNumberError.textContent = "Phone Number must be 10 characters and only digit number!";
        isValid = false;
    }

    if(!eircodeRegex.test(eircode)){
        eircodeError.textContent = "Eircode must start with letter D and it needs 7 characters total.";
        isvalid = false;
    }

    return isValid;
}