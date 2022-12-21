import axios from "axios";

export const getCoins = () => {
  // try {
  //   // const response = await axios.get("https://api.coinpaprika.com/v1/coins");
  //   // return await response?.data.slice(0, 100);

  return fetch("https://api.coinpaprika.com/v1/coins").then(response =>
    response.json()
  );
  // } catch (error) {
  //   console.log("error", error);
  // }
};
