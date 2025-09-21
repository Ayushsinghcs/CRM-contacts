import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch JSON data from the public directory
 * @param {string} filename - The JSON filename to fetch (without .json extension)
 * @returns {Object} - { data, loading, error }
 */
export const useFetchContacts = (filename) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/${filename}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}.json: ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
        console.error(`Error fetching ${filename}.json:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (filename) {
      fetchData();
    }
  }, [filename]);

  return { data, loading, error };
};
