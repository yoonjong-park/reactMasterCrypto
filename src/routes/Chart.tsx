import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { getCoinHistory } from "APIs/get/getCoin";

interface ChartProps {
  coinID: string;
}

const Chart = () => {
  const { coinID } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery(["ohlcv", coinID], () =>
    getCoinHistory(coinID)
  );

  return isLoading ? <h1>loading</h1> : <h1>Chart</h1>;
};

export default Chart;
