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
    const options = {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return `${new Date(date).toLocaleString("ko-KR", options)} UTC`;
  };

  console.log(locailDate(exchangeData?.time_last_update_utc));

  const roundExchangeData = (base, exchange) => {
    return Math.round(base * exchange * 1000) / 1000;
  };

  return (
    <Container>
      <CalculateResultsWrapper>
        <p>{`${baseCurrency} ${base} = `}</p>
        <h1>
          {`${roundExchangeData(
            baseCurrency,
            exchangeData?.conversion_rate
          )} ${target}`}
        </h1>
        <p>{locailDate(exchangeData?.time_last_update_utc)}</p>
      </CalculateResultsWrapper>

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
        {`${baseCurrency} ${base} = `}
        {`${roundExchangeData(
          baseCurrency,
          exchangeData?.conversion_rate
        )} ${target}`}
      </span>
      {/* ) : null} */}
    </Container>
  );
};

export default CurrencyCalculator;

const Container = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 10px;
  background: var(--white);
  img {
    width: 30px;
  }
`;

const CalculateResultsWrapper = styled.div`
  p {
    color: var(--grayscale);
  }

  h1 {
    font-size: 40px;
  }
`;
