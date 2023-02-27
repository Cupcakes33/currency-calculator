import { useState } from "react";
import useExchangeData from "../hooks/useExchangeData";

const CurrencyCalculator = () => {
  const [base, setBase] = useState("EUR");
  const [target, setTarget] = useState("GBP");

  const exchangeData = useExchangeData(base, target);

  return (
    <div>
      <input value={base} onChange={(e) => setBase(e.target.value)} />
      <input value={target} onChange={(e) => setTarget(e.target.value)} />
      {exchangeData ? <span>{exchangeData.conversion_rate}</span> : null}
    </div>
  );
};

export default CurrencyCalculator;
