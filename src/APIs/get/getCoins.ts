import axios from "axios";

export const getCoins = async () => {
  try {
    const response = await axios.get("https://api.coinpaprika.com/v1/coins");
    return await response.data.slice(0, 100);
  } catch (error) {
    console.log("error", error);
  }
};
