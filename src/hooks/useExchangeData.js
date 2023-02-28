import { useState, useEffect } from "react";
import { exchangeAPI } from "../apis/axios";

const useExchangeData = (base, target) => {
  const [exchangeData, setExchangeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await exchangeAPI.pair(base, target);
      setExchangeData(data);
      setError(null);
    })();
  }, [base, target]);

  return [exchangeData, error];
};

export default useExchangeData;
