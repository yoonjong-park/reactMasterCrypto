import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { getCoinHistory } from "APIs/get/getCoin";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "atoms";

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
  const isDark = useRecoilValue(isDarkAtom);

  const { coinID } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinID], () =>
    getCoinHistory(coinID)
  );

  return isLoading ? (
    <h1>loading</h1>
  ) : (
    <ReactApexChart
      type="candlestick"
      series={[
        {
          // name: "Price",
          data: data?.map(price => [
            price.time_open,
            Number(price.open),
            Number(price.high),
            Number(price.low),
            Number(price.close),
          ]) as number[][],
        },
      ]}
      options={{
        theme: { mode: isDark ? "dark" : "light" },
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
          type: "datetime",
          categories: data?.map(price => price.time_close * 1000),
        },
        yaxis: { show: false },
        fill: { type: "gradient", gradient: { gradientToColors: ["blue"] } },
        colors: ["red"],
        tooltip: { y: { formatter: value => `${value.toFixed(2)}` } },
      }}></ReactApexChart>
  );
};

export default Chart;
