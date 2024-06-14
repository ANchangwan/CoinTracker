import { useContext } from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import fetchCoinsHistory from "../api/api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}
export interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
  map: any;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical>(["chart", coinId], () =>
    fetchCoinsHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((item: any) => ({
                x: new Date(item.time_open),
                y: [item.high, item.open, item.low, item.close],
              })),
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              type: "candlestick",
              height: 500,
              background: "transparent",
            },

            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
              axisTicks: { show: false },
              labels: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
