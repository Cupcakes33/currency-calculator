import { useState, useEffect } from "react";
import styled from "styled-components";
import { COUNTRY_LIST } from "../data/country-list";
import CurrencyInput from "../components/CurrencyInput";
import { exchangeAPI } from "../apis/axios";
import ExchangeRate from "../components/ExchangeRate";

const CurrencyCalculator = () => {
  const [baseCurrency, setBaseCurrency] = useState("미국 달러");
  const [targetCurrency, setTargetCurrency] = useState("한국 원");
  const [baseValue, setBaseValue] = useState(1);
  const [targetValue, setTargetValue] = useState(1);
  const [conversionRate, setConversionRate] = useState(1);
  const [timeLastUpdated, setTimeLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const base = COUNTRY_LIST[baseCurrency];
    const target = COUNTRY_LIST[targetCurrency];
    setIsLoading(true);
    exchangeAPI.get(base, target).then((res) => {
      setTimeLastUpdated(res.time_last_update_utc);
      setConversionRate(res.conversion_rate);
      setIsLoading(false);
    });
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    setTargetValue(roundExchangeData(baseValue * conversionRate));
  }, [conversionRate]);

  const roundExchangeData = (exchange) => {
    return Math.floor(parseFloat(exchange) * 1000) / 1000;
  };

  const baseValueChangeHandler = (baseValue) => {
    setTargetValue(roundExchangeData(baseValue * conversionRate));
    setBaseValue(baseValue);
  };

  const targetValueChangeHandler = (targetValue) => {
    setBaseValue(roundExchangeData(targetValue / conversionRate));
    setTargetValue(targetValue);
  };

  return (
    <Container>
      <ExchangeRate
        isLoading={isLoading}
        baseValue={baseValue}
        baseCurrency={baseCurrency}
        targetValue={targetValue}
        targetCurrency={targetCurrency}
        timeLastUpdated={timeLastUpdated}
      />

      <CalculatorWrapper>
        <CurrencyInput
          country={baseCurrency}
          setCountry={setBaseCurrency}
          value={baseValue}
          setValue={baseValueChangeHandler}
        />
        <CurrencyInput
          country={targetCurrency}
          setCountry={setTargetCurrency}
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

const CalculatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
