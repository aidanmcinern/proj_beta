// server.js
const express = require('express');
const { getSecret } = require('./keyVaultHelper'); // Import the function to get secrets
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to fetch secret
app.get('/api/get-secret', async (req, res) => {
    try {
        const secretName = req.query.secretName; // Get the secret name from the query parameters
        if (!secretName) {
            return res.status(400).send('Secret name is required');
        }
        const secretValue = await getSecret(secretName); // Fetch the secret from Key Vault
        res.json({ secret: secretValue }); // Send the secret back in the response
    } catch (error) {
        console.error(`Error fetching secret: ${error.message}`);
        res.status(500).send('Failed to fetch secret');
    }
});

/* async function connectToDatabase() {
    try {
        const mongoURI = await getSecret();
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
    }
}

connectToDatabase(); */


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

