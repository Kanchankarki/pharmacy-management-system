const express = require('express');
const cors = require('cors');  // Import CORS
const app = express();
const pharmacyRoutes = require('./pharmacyRoutes');  // Import the routes

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS to allow requests from different origins (e.g., React frontend)
app.use(cors());  // Use the CORS middleware

// Routes
app.use('/api', pharmacyRoutes);  // Use the routes for handling requests

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
