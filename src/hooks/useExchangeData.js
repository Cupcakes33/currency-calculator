import { useState, useEffect } from "react";
import { exchangeAPI } from "../apis/axios";

const useExchangeData = (base, target) => {
  const [exchangeData, setExchangeData] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await exchangeAPI.pair(base, target);
      setExchangeData(data);
    })();
  }, [base, target]);

  return exchangeData;
};

export default useExchangeData;
