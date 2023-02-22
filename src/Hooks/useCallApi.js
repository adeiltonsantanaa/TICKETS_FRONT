import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCallApi(url, method = 'get', options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url,
          method,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, options]);

  return [data, isLoading, error];
}