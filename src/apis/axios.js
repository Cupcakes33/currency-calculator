import axios from "axios";

const EXCHANGERATES_API_KEY = process.env.REACT_APP_EXCHANGERATES_API_KEY;

const exchangeratesAxiosInstance = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6`,
});

export const exchangeAPI = {
  pair: async (base, target) => {
    const { data } = await exchangeratesAxiosInstance.get(
      `${EXCHANGERATES_API_KEY}/pair/${base}/${target}`
    );
    return data;
  },
};
