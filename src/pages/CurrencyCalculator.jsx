import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { COUNTRY_LIST } from "../data/country-list";
import CurrencyInput from "../components/CurrencyInput";
import { exchangeAPI } from "../apis/axios";

const CurrencyCalculator = () => {
  const [base, setBase] = useState("미국 달러");
  const [target, setTarget] = useState("한국 원");
  const [baseValue, setBaseValue] = useState(1);
  const [targetValue, setTargetValue] = useState(1);
  const [conversionRate, setConversionRate] = useState({});
  const [timeLastUpdate, setTimeLastUpdate] = useState("");

  useEffect(() => {
    exchangeAPI.get(COUNTRY_LIST[base]).then((res) => {
      setTimeLastUpdate(res.time_last_update_utc);
      setConversionRate(res.conversion_rates);
    });
  }, [base]);

  const roundExchangeData = (exchange) => {
    return Math.round(exchange * 1000) / 1000;
  };

  const locailDate = useCallback(() => {
    const options = {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return `${new Date(timeLastUpdate).toLocaleString("ko-KR", options)} UTC`;
  }, [timeLastUpdate]);

  const baseValueChangeHandler = (baseValue) => {
    setTargetValue(
      roundExchangeData(
        (baseValue * conversionRate[COUNTRY_LIST[target]]) /
          conversionRate[COUNTRY_LIST[base]]
      )
    );
    setBaseValue(baseValue);
  };

  const baseCountryChangeHandler = (base) => {
    setTargetValue(
      roundExchangeData(
        (baseValue * conversionRate[COUNTRY_LIST[target]]) /
          conversionRate[COUNTRY_LIST[base]]
      )
    );
    setBase(base);
  };

  const targetValueChangeHandler = (targetValue) => {
    setBaseValue(
      roundExchangeData(
        (targetValue * conversionRate[COUNTRY_LIST[base]]) /
          conversionRate[COUNTRY_LIST[target]]
      )
    );
    setTargetValue(targetValue);
  };

  const targetCountryChangeHandler = (target) => {
    setBaseValue(
      roundExchangeData(
        (targetValue * conversionRate[COUNTRY_LIST[base]]) /
          conversionRate[COUNTRY_LIST[target]]
      )
    );
    setTarget(target);
  };

  return (
    <Container>
      <BaseExchangeRateWrapper>
        <p>{`1 ${base} = `}</p>
        <h1>{`${roundExchangeData(
          conversionRate[COUNTRY_LIST[target]]
        )} ${target}`}</h1>
        <p>{locailDate()}</p>
      </BaseExchangeRateWrapper>

      <CalculatorWrapper>
        <CurrencyInput
          country={base}
          setCountry={baseCountryChangeHandler}
          value={baseValue}
          setValue={baseValueChangeHandler}
        />
        <CurrencyInput
          country={target}
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
