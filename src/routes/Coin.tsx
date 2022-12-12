import React from "react";
import { Params, useParams } from "react-router-dom";

interface RouteParams extends Params {
  coinID: string;
}

const Coin = (props: any) => {
  const { coinID } = useParams<RouteParams>();
  console.log("props coin", props);

  return <h1>{coinID}</h1>;
};

export default Coin;
