import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Coins />,
  },
  {
    path: "/:coinID",
    element: <Coin />,
  },
]);

export default router;
