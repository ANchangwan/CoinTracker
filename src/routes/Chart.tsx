import { useContext } from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import fetchCoinsHistory from "../api/api";

interface ChartProps {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery(["chart", coinId], () =>
    fetchCoinsHistory(coinId)
  );
  console.log(data);
  return <h1>Chdart</h1>;
}

export default Chart;
