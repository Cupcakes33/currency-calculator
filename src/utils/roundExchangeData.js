export const roundExchangeData = (exchange) => {
  return Math.floor(parseFloat(exchange) * 1000) / 1000;
};