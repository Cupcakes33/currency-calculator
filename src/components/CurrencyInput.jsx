import { COUNTRY_LIST } from "../data/country-list";

const CurrencyInput = ({ country, setCountry, value, setValue }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {Object.keys(COUNTRY_LIST).map((currency, n) => (
          <option value={currency} key={`${n}`}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;
