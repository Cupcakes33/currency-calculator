import { useState } from "react";
import styled from "styled-components";
import useExchangeData from "../hooks/useExchangeData";

const CurrencyCalculator = () => {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("KRW");
  const [baseCurrency, setBaseCurrency] = useState(1);
  // const [exchangeData, error] = useExchangeData(base, target);

  const exchangeData = {
    conversion_rate: 1000,
    time_last_update_utc: "Mon, 27 Feb 2023 00:00:01 +0000",
  };

  const locailDate = (date) => {
    return new Date(date).toLocaleString();
  };

  console.log(locailDate(exchangeData?.time_last_update_utc));

  const roundExchangeData = (base, exchange) => {
    return Math.round(base * exchange * 1000) / 1000;
  };

  return (
    <Container>
      <p>{`${baseCurrency} ${base} = `}</p>
      <h3>
        {`${roundExchangeData(
          baseCurrency,
          exchangeData?.conversion_rate
        )} ${target}`}
      </h3>
      <p>{locailDate(exchangeData?.time_last_update_utc)}</p>
      <img src={`https://flagsapi.com/BE/shiny/64.png`} alt="base flag" />
      <img src={`https://flagsapi.com/BE/shiny/64.png`} alt="target flag" />

      <input value={base} onChange={(e) => setBase(e.target.value)} />
      <input value={target} onChange={(e) => setTarget(e.target.value)} />
      <input
        type="number"
        defaultValue={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      />
      {/* {exchangeData ? ( */}
      <span>
        {baseCurrency}
        {base} =
        {Math.round(baseCurrency * exchangeData.conversion_rate * 1000) / 1000}
        {target}
      </span>
      {/* ) : null} */}
    </Container>
  );
};

export default CurrencyCalculator;

const Container = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #efefef;
  img {
    width: 30px;
  }
`;
