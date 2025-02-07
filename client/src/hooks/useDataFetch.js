import { useState, useEffect } from 'react';

export const useDataFetch = () => {
  const [datasets, setDatasets] = useState({
    climate: [],
    migration: []
  });

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002'; // Default to localhost in case env var is missing
    console.log("Backend URL: ", backendUrl);
    const fetchAllData = async () => {
      try {
        const climateResponse = await fetch(`${backendUrl}/api/collection?collection=demo`);
        const migrationResponse = await fetch(`${backendUrl}/api/collection?collection=demo2`);

        const climateData = await climateResponse.json();
        const migrationData = await migrationResponse.json();

        setDatasets({
          climate: climateData.demo || [],
          migration: migrationData.demo2 || []
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setDatasets({
          climate: [],
          migration: []
        });
      }
    };

    fetchAllData();
  }, []);

  return datasets;
};

export default useDataFetch;