import axios from "axios";
import { GET_COIN_API_BASE_URL as BASE_URL } from "config/config";

export const getCoin = async (coinID: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinID}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getCoinPrice = async (coinID: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/tickers/${coinID}`);
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
};
