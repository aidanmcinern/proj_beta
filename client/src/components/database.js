// src/database.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_DB_CONNECTION_STRING; // Add your connection string to .env

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database;

async function connectToDatabase() {
  if (!database) {
    try {
      await client.connect();
      database = client.db('your-database-name'); // Replace with your database name
      console.log('Connected to the database');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
  return database;
}

module.exports = { connectToDatabase };
