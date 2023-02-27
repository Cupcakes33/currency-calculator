import { useState, useEffect } from "react";
import { exchangeAPI } from "../apis/axios";

const useExchangeData = (base, target) => {
  const [exchangeData, setExchangeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await exchangeAPI.pair(base, target);
        setExchangeData(data);
        setError(null);
      } catch (error) {
        setExchangeData(null);
        setError(error);
      }
    })();
  }, [base, target]);

  return [exchangeData, error];
};

export default useExchangeData;
