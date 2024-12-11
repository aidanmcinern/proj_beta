// server.js
const express = require('express');
//const { getSecret } = require('./keyVaultHelper'); // Import the function to get secrets
//const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3002;


const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const { MongoClient } = require("mongodb");
require("dotenv").config();



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
/*
 async function connectToDatabase() {
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



// Retrieve connection string from Key Vault
async function getCosmosConnectionString() {
    const keyVaultUrl = process.env.AZURE_KEY_VAULT_URL;
    const secretName = process.env.SECRET_NAME;

    const credential = new DefaultAzureCredential();
    const secretClient = new SecretClient(keyVaultUrl, credential);

    const secret = await secretClient.getSecret(secretName);
    return secret.value; // Cosmos DB connection string
}

const fetchCollectionData = async (collectionName) => {
    try {
      const connectionString = await getCosmosConnectionString();
      const client = new MongoClient(connectionString);
      await client.connect();
      
      const db = client.db("projbeta-database");
      const collection = db.collection(collectionName);
      
      const documents = await collection.find({}).toArray();
      
      await client.close();
      
      return documents;
    } catch (error) {
      console.error(`Error retrieving ${collectionName} collection:`, error);
      throw error; // Rethrow to be caught in the main route handler
    }
  };
  
  app.get('/api/collection', async (req, res) => {
    try {
      const collection = req.query.collection.split(',');
      const results = {};
      
      // Use Promise.all for concurrent fetching
      const fetchPromises = collection.map(async (collection) => {
        results[collection] = await fetchCollectionData(collection);
      });
      
      await Promise.all(fetchPromises);
      
      // Explicitly set JSON content type
      res.setHeader('Content-Type', 'application/json');
      res.json(results);
    } catch (error) {
      console.error("Error retrieving collections:", error);
      res.status(500).json({ 
        error: "Error retrieving collections", 
        details: error.message 
      });
    }
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

