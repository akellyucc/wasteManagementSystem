const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { initSocket, emitBinStatusUpdate } = require('../waste-management-system/src/components/SocketService'); // Adjust path as needed

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your front-end's URL
}));

// Create a connection pool with hardcoded values
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',             // Directly specify your host
    user: 'root',                  // Directly specify your user
    password: 'Visa@198!',         // Directly specify your password
    database: 'waste_management',  // Directly specify your database name
});

// Function to execute queries
const queryDB = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Basic health check route
app.get('/', (req, res) => {
    res.send("Server is running.");
});

// Example API route
app.get('/api/report/:parishName', async (req, res) => {
    const parishName = req.params.parishName;

    // Your SQL queries and logic here

    res.json({ message: "Report data for " + parishName });
});

// Export the app as a serverless function
module.exports = app;
