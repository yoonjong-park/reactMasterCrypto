import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { getCoinHistory } from "APIs/get/getCoin";
import ReactApexChart from "react-apexcharts";

interface IHistorical {
  time_close: number;
  time_open: number;
  high: string;
  low: string;
  open: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinID: string;
}

const Chart = () => {
  const { coinID } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinID], () =>
    getCoinHistory(coinID)
  );
  console.log("chart data");

  return isLoading ? (
    <h1>loading</h1>
  ) : (
    <ReactApexChart
      type="line"
      series={[
        {
          name: "Price",
          data: data?.map(price => Number(price.close)) as number[],
        },
      ]}
      options={{
        theme: { mode: "dark" },
        chart: {
          height: 500,
          width: 500,
          toolbar: { show: false },
          background: "transparent",
        },
        stroke: { curve: "smooth", width: 3 },
        grid: { show: false },
        xaxis: {
          labels: { show: false },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: { show: false },
      }}></ReactApexChart>
  );
};

export default Chart;
