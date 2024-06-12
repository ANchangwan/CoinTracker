import { createBrowserRouter } from "react-router-dom";
import Root from "../Router";
import Coins from "./Coins";
import Coin from "./Coin";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: "coin/:coinId",
        element: <Coin />,
      },
    ],
  },
]);
