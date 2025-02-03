require('dotenv').config();

const { getSecret } = require('./keyVaultHelper'); // Adjust the path as necessary

console.log(process.env); // Log to see all environment variables

const secretName = process.env.SECRET_NAME; // Get the secret name from the .env file

if (!secretName) {
    console.error('SECRET_NAME is undefined');
} else {
    console.log(`Attempting to fetch secret: ${secretName}`);
    
    getSecret(secretName)
        .then(secretValue => {
            console.log(`Secret Value: ${secretValue}`);
        })
        .catch(error => {
            console.error(`Error fetching secret: ${error.message}`);
        });
}
