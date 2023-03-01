import { useCallback } from "react";
import styled from "styled-components";

const ExchangeRate = ({
  baseValue,
  baseCurrency,
  targetValue,
  targetCurrency,
  timeLastUpdated,
}) => {
  
  const locailDate = useCallback(() => {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return `${new Date(timeLastUpdated).toLocaleString("ko-KR", options)} UTC`;
  }, [timeLastUpdated]);

  return (
    <Container>
      <p>{`${baseValue} ${baseCurrency} = `}</p>
      <h1>{`${targetValue} ${targetCurrency}`}</h1>
      <p>{locailDate()}</p>
    </Container>
  );
};

export default ExchangeRate;

const Container = styled.div`
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
