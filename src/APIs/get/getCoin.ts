import axios from "axios";

export const getCoin = async (coinID: string | undefined) => {
  try {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/coins/${coinID}`
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getCoinPrice = async (coinID: string | undefined) => {
  try {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${coinID}`
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
};
