// server.js
// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// 1. MODULES AND CONNECTION SETUP
// ----------------------------------------------------
// Require the mysql2 module - CORRECTED: added quotes
const mysql = require('mysql2'); 

// Create the pool connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert the pool.query method to use Promises for cleaner async/await usage
// CORRECTED: Added parentheses to pool.promise()
const promisePool = pool.promise(); 

// 2. DATABASE SCHEMA FUNCTION
// ----------------------------------------------------
async function createTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS user_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_number CHAR(10) NOT NULL, 
        eircode CHAR(7) NOT NULL, 
        submission_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    try {
        await promisePool.query(createTableQuery);
        console.log("Database table 'user_info' checked/created successfully.");
    } catch (error) {
        console.error("Error creating database table:", error);
    }
}

// 3. EXPRESS SERVER SETUP
// ----------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 

// NEW: Middleware to serve static files (like form.html) from the root directory
app.use(express.static(__dirname)); 
// Middleware to parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// 4. POST ROUTE HANDLER (Receives Form Data)
// ----------------------------------------------------
app.post('/submit-form', async (req, res) => {
    // Destructuring and renaming fields from req.body
    const { 
        'first-name': firstName, 
        'last-name': lastName, 
        email, 
        'phone-number': phoneNumber, 
        eircode 
    } = req.body;

    // Parameterized INSERT query
    const insertQuery = `
        INSERT INTO user_info (first_name, last_name, email, phone_number, eircode)
        VALUES (?,?,?,?,?)`;

    const data = [firstName, lastName, email, phoneNumber, eircode];

    try {
        const [result] = await promisePool.query(insertQuery, data);
        
        console.log(` User inserted successfully. ID: ${result.insertId}`);
        // Log the received data after the successful insertion
        console.log("Received form data:", req.body); 

        // Send a success status code (201 Created is often used for successful INSERT)
        //res.status(201).send('Form data received and saved successfully!');
        res.send(`
            <h1>Submission Successful!</h1>
            <p>Thank you, ${firstName}. Your data has been saved.</p>
            <p><a href="form.html">Go back to the form</a></p>
        `);

    } catch (error) {
        // Log the full error to the console
        console.error("Database insertion failed:", error);
        
        // Handle specific unique constraint violation for better UX
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('Error: This email address is already registered.');
        }

        res.status(500).send(`
            <h1>Submission Failed</h1>
            <p>${userMessage}</p>
            <p><a href="/">Go back to the form</a></p>
        `);
    }
});

// 5. START SERVER LISTENER (After creating the table)
// ----------------------------------------------------
// Create the table, then start the server
createTable().then(() => {
    app.listen(port, (err) => {
        if (err) {
            console.error(`Server startup failed: ${err.message}`);
            return;
        }
        console.log(`Server running on http://localhost:${port}`);
    });
});