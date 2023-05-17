import { getData } from "../services/getData";
import { useEffect, useState } from "react";
export const useData = (url) => {


  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
  const fetchData = () => {
    setLoading(true);
    getData({ url })
      .then(setData)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(fetchData, [url]);

  return { data, loading, error };
};
