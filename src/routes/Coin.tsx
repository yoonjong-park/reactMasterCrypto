import React from "react";
import { Params, useParams, useLocation } from "react-router-dom";

interface RouteParams extends Params {
  coinID: string;
}

interface LocationState {
  state: any;
}

const Coin = (props: any) => {
  const { coinID } = useParams<RouteParams>();
  const { state } = useLocation();
  console.log("props coin", props);

  console.log("state ", state);

  return <h1>{coinID}</h1>;
};

export default Coin;
