import { useEffect, useState } from "react";
import { exchangeAPI } from "../apis/axios";

const CurrencyCalculator = () => {
  useEffect(() => {
    (async () => {
      const data = await exchangeAPI.pair("EUR", "GBP");
      console.log(data);
    })();
  }, []);
  return <div></div>;
};

export default CurrencyCalculator;
