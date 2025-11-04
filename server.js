// --- 1. REQUIRE MODULES/LIBRARIES ---
// The Express framework is required to build the web server
const express = require('express');
// body-parser is required to parse incoming request bodies (form data)
const bodyParser = require('body-parser');

// --- 2. INITIALIZE APP & CONFIGURATION ---
const app = express();
const port = 3000; // Define the port the server will run on

// --- 3. MIDDLEWARE SETUP ---
// This tells Express to use body-parser middleware.
// It parses form data submitted via POST requests and makes it available in req.body.
app.use(bodyParser.urlencoded({ extended: true }));

// --- 4. POST ROUTE HANDLER (Receives Form Data) ---
// This handles the POST request sent by your HTML form to the '/submit-form' path.
app.post('/submit-form', async (req, res) => {
    try {
        // --- DATA ACCESS ---
        // req.body contains all the form data (first-name, email, etc.)
        // based on the 'name' attributes you set in your form.
        const formData = req.body;
        
        console.log("Successfully received form data:");
        console.log(formData);

        // --- SUCCESS RESPONSE ---
        // Send a success status code (200 OK) and a message back to the client.
        // This is what prevents the HTTP ERROR 405 on a successful submission.
        res.status(200).send('Form data received successfully on the server!');
        
    } catch (error) {
        // --- CATCH/ERROR RESPONSE ---
        // If an unexpected server error occurs (e.g., failed to process),
        // send an HTTP 500 status code (Internal Server Error) back to the client.
        console.error("Error processing form submission:", error);
        res.status(500).send('Internal Server Error: Failed to process form submission.');
    }
});

// --- 5. START SERVER LISTENER ---
// Start the Express server and bind it to the defined port.
app.listen(port, (err) => {
    if (err) {
        // This handles errors like the port being already in use.
        console.error(`Server startup failed: ${err.message}`);
        return; 
    }
    // Success message for the console.
    console.log(`Server running on http://localhost:${port}`);
});