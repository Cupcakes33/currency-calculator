import { useState } from "react";
import styled from "styled-components";
import useExchangeData from "../hooks/useExchangeData";

const CurrencyCalculator = () => {
  const [base, setBase] = useState("EUR");
  const [target, setTarget] = useState("GBP");
  const [baseCurrency, setBaseCurrency] = useState(1);

  const [exchangeData, error] = useExchangeData(base, target);

  return (
    <Container>
      <img src={`https://flagsapi.com/BE/shiny/64.png`} alt="base flag" />
      <img src={`https://flagsapi.com/BE/shiny/64.png`} alt="target flag" />

      <input value={base} onChange={(e) => setBase(e.target.value)} />
      <input value={target} onChange={(e) => setTarget(e.target.value)} />
      <input
        type="number"
        defaultValue={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      />
      {exchangeData ? (
        <span>
          {baseCurrency}
          {base} =
          {Math.round(baseCurrency * exchangeData.conversion_rate * 1000) /
            1000}
          {target}
        </span>
      ) : null}
    </Container>
  );
};

export default CurrencyCalculator;

const Container = styled.div`
  img {
    width: 30px;
  }
`;
