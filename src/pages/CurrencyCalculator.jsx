import { useState } from "react";
import styled from "styled-components";
import useExchangeData from "../hooks/useExchangeData";
import { COUNTRY_LIST } from "../data/country-list";
import CurrencyDropdown from "../components/CurrencyDropdown";

const CurrencyCalculator = () => {
  const [base, setBase] = useState("미국 달러");
  const [target, setTarget] = useState("한국 원");
  const [baseCurrency, setBaseCurrency] = useState(1);
  const [exchangeData, error] = useExchangeData(
    COUNTRY_LIST[base],
    COUNTRY_LIST[target]
  );

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

  const roundExchangeData = (base, exchange) => {
    return Math.round(base * exchange * 1000) / 1000;
  };

  return (
    <Container>
      <BaseExchangeRateWrapper>
        <p>{`1 ${base} = `}</p>
        <h1>{`${roundExchangeData(
          1,
          exchangeData?.conversion_rate
        )} ${target}`}</h1>
        <p>{locailDate(exchangeData?.time_last_update_utc)}</p>
      </BaseExchangeRateWrapper>

      <CurrencyDropdown value={base} setValue={setBase} />
      <CurrencyDropdown value={target} setValue={setTarget} />
      <input
        type="number"
        defaultValue={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      />

      {exchangeData ? (
        <span>
          {`${baseCurrency} ${base} = `}
          {`${roundExchangeData(
            baseCurrency,
            exchangeData?.conversion_rate
          )} ${target}`}
        </span>
      ) : null}
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

const BaseExchangeRateWrapper = styled.div`
  p {
    color: var(--grayscale);

    &:last-child {
      font-size: small;
    }
  }
  h1 {
    font-size: 40px;
  }
`;
