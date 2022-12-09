import React from "react";
import { Params, useParams } from "react-router-dom";

interface RouteParams extends Params {
  coinID: string;
}

const Coin = () => {
  const { coinID } = useParams<RouteParams>();

  return <h1>{coinID}</h1>;
};

export default Coin;
