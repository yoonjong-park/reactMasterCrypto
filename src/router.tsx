import React, { useState } from "react";
import { createBrowserRouter, BrowserRouter } from "react-router-dom";

import Coin from "routes/Coin";
import Coins from "routes/Coins";
import Chart from "routes/Chart";
import Price from "routes/Price";

// interface IRouterProps {
//   toggleDark: () => void;
// }

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Coins />,
    },
    {
      path: "/:coinID",
      element: <Coin />,
      children: [
        {
          path: "chart",
          element: <Chart />,
        },
        {
          path: "price",
          element: <Price />,
        },
      ],
    },
  ],
  { basename: "/reactMasterCrypto/" }
);

export default router;
