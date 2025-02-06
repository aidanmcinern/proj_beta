import { useState, useEffect } from 'react';

export const useDataFetch = () => {
  const [datasets, setDatasets] = useState({
    climate: [],
    migration: []
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const climateResponse = await fetch('projbeta-eccgcfftg6gug4gw.northeurope-01.azurewebsites.net/api/collection?collection=demo');
        const migrationResponse = await fetch('projbeta-eccgcfftg6gug4gw.northeurope-01.azurewebsites.net/api/collection?collection=demo2');

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