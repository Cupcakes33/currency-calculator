import { useState, useEffect } from "react";
import styled from "styled-components";
import useExchangeData from "../hooks/useExchangeData";
import { COUNTRY_LIST } from "../data/country-list";
import CurrencyInput from "../components/CurrencyInput";

const CurrencyCalculator = () => {
  const [base, setBase] = useState("미국 달러");
  const [target, setTarget] = useState("한국 원");
  const [baseValue, setBaseValue] = useState(1);
  const [targetValue, setTargetValue] = useState(1);
  const [exchangeData, error] = useExchangeData(
    COUNTRY_LIST[base],
    COUNTRY_LIST[target]
  );

  useEffect(() => {
    if (exchangeData) {
      const roundValue = roundExchangeData(exchangeData.conversion_rate);
      setTargetValue(roundValue);
    }
  }, [exchangeData]);

  const roundExchangeData = (exchange) => {
    return Math.round(exchange * 1000) / 1000;
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

  const baseValueChangeHandler = (baseValue) => {
    const roundValue = roundExchangeData(
      baseValue * exchangeData?.conversion_rate
    );
    setTargetValue(roundValue);
    setBaseValue(baseValue);
  };

  const targetValueChangeHandler = (targetValue) => {
    const roundValue = roundExchangeData(
      targetValue / exchangeData?.conversion_rate
    );
    setBaseValue(roundValue);
    setTargetValue(targetValue);
  };

  return (
    <Container>
      <BaseExchangeRateWrapper>
        <p>{`1 ${base} = `}</p>
        <h1>{`${roundExchangeData(
          exchangeData?.conversion_rate
        )} ${target}`}</h1>
        <p>{locailDate(exchangeData?.time_last_update_utc)}</p>
      </BaseExchangeRateWrapper>

      <CurrencyInput
        country={base}
        setCountry={setBase}
        value={baseValue}
        setValue={baseValueChangeHandler}
      />
      <CurrencyInput
        country={target}
        setCountry={setTarget}
        value={targetValue}
        setValue={targetValueChangeHandler}
      />
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
