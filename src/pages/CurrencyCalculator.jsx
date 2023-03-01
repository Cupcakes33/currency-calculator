import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { COUNTRY_LIST } from "../data/country-list";
import CurrencyInput from "../components/CurrencyInput";
import { exchangeAPI } from "../apis/axios";

const CurrencyCalculator = () => {
  const [baseCurrency, setBaseCurrency] = useState("미국 달러");
  const [targetCurrency, setTargetCurrency] = useState("한국 원");
  const [baseValue, setBaseValue] = useState(1);
  const [targetValue, setTargetValue] = useState(1);
  const [conversionRate, setConversionRate] = useState({});
  const [timeLastUpdated, setTimeLastUpdated] = useState("");

  useEffect(() => {
    exchangeAPI.get(COUNTRY_LIST[baseCurrency]).then((res) => {
      setTimeLastUpdated(res.time_last_update_utc);
      setConversionRate(res.conversion_rates);
    });
  }, [baseCurrency]);

  const roundExchangeData = (exchange) => {
    return Math.round(exchange * 1000) / 1000;
  };

  const locailDate = useCallback(() => {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return `${new Date(timeLastUpdated).toLocaleString("ko-KR", options)} UTC`;
  }, [timeLastUpdated]);

  const baseValueChangeHandler = (baseValue) => {
    setTargetValue(
      roundExchangeData(
        (baseValue * conversionRate[COUNTRY_LIST[targetCurrency]]) /
          conversionRate[COUNTRY_LIST[baseCurrency]]
      )
    );
    setBaseValue(baseValue);
  };

  const baseCountryChangeHandler = (baseCurrency) => {
    setTargetValue(
      roundExchangeData(
        (baseValue * conversionRate[COUNTRY_LIST[targetCurrency]]) /
          conversionRate[COUNTRY_LIST[baseCurrency]]
      )
    );
    setBaseCurrency(baseCurrency);
  };

  const targetValueChangeHandler = (targetValue) => {
    setBaseValue(
      roundExchangeData(
        (targetValue * conversionRate[COUNTRY_LIST[baseCurrency]]) /
          conversionRate[COUNTRY_LIST[targetCurrency]]
      )
    );
    setTargetValue(targetValue);
  };

  const targetCountryChangeHandler = (targetCurrency) => {
    setBaseValue(
      roundExchangeData(
        (targetValue * conversionRate[COUNTRY_LIST[baseCurrency]]) /
          conversionRate[COUNTRY_LIST[targetCurrency]]
      )
    );
    setTargetCurrency(targetCurrency);
  };

  return (
    <Container>
      <BaseExchangeRateWrapper>
        <p>{`1 ${baseCurrency} = `}</p>
        <h1>{`${roundExchangeData(
          conversionRate[COUNTRY_LIST[targetCurrency]]
        )} ${targetCurrency}`}</h1>
        <p>{locailDate()}</p>
      </BaseExchangeRateWrapper>

      <CalculatorWrapper>
        <CurrencyInput
          country={baseCurrency}
          setCountry={baseCountryChangeHandler}
          value={baseValue}
          setValue={baseValueChangeHandler}
        />
        <CurrencyInput
          country={targetCurrency}
          setCountry={targetCountryChangeHandler}
          value={targetValue}
          setValue={targetValueChangeHandler}
        />
      </CalculatorWrapper>
    </Container>
  );
};

export default CurrencyCalculator;

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 20px 10px;
  background: var(--white);
  img {
    width: 30px;
  }
`;

const BaseExchangeRateWrapper = styled.div`
  margin-bottom: 30px;
  p {
    color: var(--grayscale);
    &:last-child {
      font-size: small;
    }
  }
  h1 {
    font-size: 35px;
  }
`;

const CalculatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
