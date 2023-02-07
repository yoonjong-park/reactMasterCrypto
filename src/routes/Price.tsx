import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { getCoinPrice } from "APIs/get/getCoin";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "atoms";

interface IPriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

interface ChartProps {
  coinID: string;
}

const Price = () => {
  const isDark = useRecoilValue(isDarkAtom);

  const { coinID } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IPriceInfo>(["coinPrice", coinID], () =>
    getCoinPrice(coinID)
  );

  return isLoading ? <h1>loading</h1> : <>{data?.quotes?.USD?.price}</>;
};

export default Price;
