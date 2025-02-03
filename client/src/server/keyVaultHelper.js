// keyVaultHelper.js

const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

// Replace with your Key Vault URL
const keyVaultName = process.env.KEY_VAULT_NAME;
const KVUri = `https://${keyVaultName}.vault.azure.net/`;

// Function to access secrets from Key Vault
async function getSecret(secretName) {
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(KVUri, credential);

    try {
        const secret = await client.getSecret(secretName);
        return secret.value; // return the value of the secret
    } catch (error) {
        console.error(`Error fetching secret from Key Vault: ${error.message}`);
        throw error;
    }
}

// Function to get MongoDB URI from Key Vault
async function getDatabaseURI() {
    const secretName = process.env.SECRET_NAME; // assuming this is the secret name for MongoDB URI
    if (!secretName) {
        throw new Error("SECRET_NAME environment variable is not defined");
    }
    return await getSecret(secretName); // call getSecret to get MongoDB URI
}

module.exports = { getSecret, getDatabaseURI };
