import { useLocation, useParams } from "react-router-dom";

function Coin() {
  const { coinId } = useParams();
  const {
    state: { name },
  } = useLocation();
  console.log(name);
  return <div>coin: {coinId}</div>;
}

export default Coin;
