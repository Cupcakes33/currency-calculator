import { COUNTRY_LIST } from "../data/country-list";
import styled from "styled-components";

const CurrencyInput = ({ country, setCountry, value, setValue }) => {
  return (
    <Container>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {Object.keys(COUNTRY_LIST).map((currency, n) => (
          <option value={currency} key={`${currency}${n}`}>
            {currency}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default CurrencyInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--grayscale_1);
  border-radius: 5px;
  padding: 10px;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border: 1px solid var(--grayscale_2);
  }

  input {
    flex: 1;
    border: none;
    border-right: 1px solid var(--grayscale_1);
    outline: none;
    font-size: 16px;
    margin-right: 10px;
  }

  select {
    flex: 2;
    font-size: 16px;
    border: none;
    outline: none;
    background-color: transparent;

    &:hover {
      cursor: pointer;
    }
  }
`;
