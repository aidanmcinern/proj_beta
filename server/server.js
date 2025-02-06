// server.js
const express = require('express');
const { getSecret } = require('./keyVaultHelper'); // Import the function to get secrets
//const mongoose = require('mongoose');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');


const allowedOrigins = (process.env.FRONTEND_URLS || '').split(',').map(url => url.trim().replace(/\/$/, ''));

app.use(cors({
  origin: function (origin, callback) {
    // Allow curl or server-to-server requests (no `Origin`)
    if (!origin) {
      return callback(null, true);
    }

    // Normalize origin comparison
    const cleanedOrigin = origin.replace(/\/$/, '');

    if (allowedOrigins.includes(cleanedOrigin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${cleanedOrigin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


const OpenAI = require('openai');
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const { MongoClient } = require("mongodb");

require("dotenv").config();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(path.join(__dirname)));

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



/* // Retrieve connection string from Key Vault
async function getCosmosConnectionString() {
  const keyVaultUrl = process.env.AZURE_KEY_VAULT_URL;
  const secretName = process.env.SECRET_NAME;

  const credential = new DefaultAzureCredential();
  const secretClient = new SecretClient(keyVaultUrl, credential);

  const secret = await secretClient.getSecret(secretName);
  return secret.value; // Cosmos DB connection string

// Function to retrieve the API key from Azure Key Vault
async function getOpenAIApiKey() {
  const keyVaultUrl = process.env.AZURE_KEY_VAULT_URL;
  const secretName = process.env.LLM;
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(keyVaultUrl, credential);
  try {
    const secret = await client.getSecret(secretName);
    return secret.value;
  } catch (error) {
    console.error('Error retrieving API key from Key Vault:', error.message);
    throw new Error('Failed to retrieve API key.');
  }
}  


} */

async function getCosmosConnectionString() {
  const secretName = process.env.SECRET_NAME || "MongoURI"; // Fallback to "MongoURI" if not set
  return await getSecret(secretName);
}

async function getOpenAIApiKey() {
  const secretName = process.env.LLM || "LLM-API-KEY"; // Fallback to "LLM-API-KEY" if not set
  return await getSecret(secretName);
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





// Chatbot route
app.post('/chat', async (req, res) => {

  try {
    // Validate the request body
    if (!req.body || typeof req.body !== 'object' || !Array.isArray(req.body.messages)) {
      console.error('Invalid request body format');
      return res.status(400).json({ error: 'Invalid request body format' });
    }

    const userMessage = req.body.messages.find(msg => msg.role === 'user')?.content;

    if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
      console.error('Invalid or empty user message:', userMessage);
      return res.status(400).json({ error: 'Invalid or empty user message' });
    }

    // Get the API key dynamically from Key Vault
    const OPENAI_API_KEY = await getOpenAIApiKey();

    // Initialize OpenAI client (new syntax)
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    // Call OpenAI's chat completion API (new syntax)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: req.body.messages,
    });
    console.log('OpenAI response:', response);

    res.json({
      reply: response.choices?.[0]?.message?.content || 'No response from OpenAI',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});



app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/test-secrets', async (req, res) => {
  try {
    const mongoUri = await getCosmosConnectionString();
    const apiKey = await getOpenAIApiKey();
    res.json({ mongoUri, apiKey });
  } catch (error) {
    res.status(500).send(`Error fetching secrets: ${error.message}`);
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});


