import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Function to fetch a secret from the server
async function fetchSecret(secretName) {
  try {
      const response = await fetch(`/api/get-secret?secretName=${secretName}`);
      if (!response.ok) {
          throw new Error('Failed to fetch the secret');
      }
      const data = await response.json();
      console.log(`Retrieved secret: ${data.secret}`);
      // Use the secret value (data.secret) as needed in your app logic
      return data.secret;
  } catch (error) {
      console.error(`Failed to retrieve secret: ${error.message}`);
      return null;
  }
}

// Fetch the secret when the app starts
(async () => {
  const secretName = 'YourSecretName'; // Replace with the actual secret name
  const secretValue = await fetchSecret(secretName);
  if (secretValue) {
      // Use the secret value in your app logic here
      console.log('Successfully retrieved the secret value:', secretValue);
  }
})();

//reportWebVitals();
