import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import fetchCoinsHistory, { fetchCoinTickers } from "../api/api";
import { PriceData } from "./Coin";
import ApexChart from "react-apexcharts";
import { IHistorical } from "./Chart";

interface PriceProps {
  coinId: string;
}

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["chart", coinId], () =>
    fetchCoinsHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => +price.close) as number[],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
            },
            yaxis: { show: false },
            xaxis: {
              axisTicks: { show: false },
              labels: {
                show: false,
              },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
