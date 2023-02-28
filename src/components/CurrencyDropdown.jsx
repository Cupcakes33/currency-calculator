import { COUNTRY_LIST } from "../data/country-list";

const CurrencyDropdown = ({ value, setValue }) => {
  const handleChangeSelect = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <input type="text" />
      <select onChange={handleChangeSelect} value={value}>
        {Object.keys(COUNTRY_LIST).map((currency, n) => (
          <option value={currency} key={`${n}`}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
