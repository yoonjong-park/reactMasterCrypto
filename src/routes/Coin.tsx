import React, { useState, useEffect } from "react";
import {
  Params,
  useParams,
  useLocation,
  Outlet,
  useMatch,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { getCoin, getCoinPrice } from "APIs/get";
import { Link } from "react-router-dom";
// import { theme } from "theme";
import { useQueries, useQuery } from "react-query";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 40px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams extends Params {
  coinID: string;
}

interface RouteState {
  state: { name: string };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  logo: string;
  parent: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: null;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const Coin = () => {
  const navigate = useNavigate();
  const { coinID } = useParams<RouteParams>();
  console.log("coinID in Coin", coinID);

  const { state } = useLocation() as RouteState;

  const matchedPrice = useMatch(`${coinID}/price`);
  const matchedChart = useMatch(`${coinID}/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinID],
    () => getCoin(coinID)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinID],
    () => getCoinPrice(coinID)
  );

  const isLoading = infoLoading || tickersLoading;

  return (
    <Container>
      <Header>
        <button onClick={() => navigate("/")}>홈</button>
        <Title>
          {state?.name ? (
            state.name
          ) : isLoading ? (
            <Loader>loading...</Loader>
          ) : (
            infoData?.name
          )}
        </Title>
      </Header>
      {isLoading ? (
        <Loader>loading...</Loader>
      ) : (
        <>
          <div>{infoData?.description}</div>
          <div>{tickersData?.total_supply}</div>
        </>
      )}
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            border: "1px solid white",
            textAlign: "center",
            padding: "20px",
            color:
              matchedChart !== null
                ? `${(props: { theme: { accentColor: string } }) =>
                    props.theme.accentColor}`
                : `${(props: { theme: { textColor: string } }) =>
                    props.theme.textColor}`,
          }}>
          <Link to="chart">Chart</Link>
        </div>
        <div
          style={{
            border: "1px solid white",
            textAlign: "center",
            padding: "20px",
            color:
              matchedPrice !== null
                ? `${(props: { theme: { accentColor: string } }) =>
                    props.theme.accentColor}`
                : `${(props: { theme: { textColor: string } }) =>
                    props.theme.textColor}`,
          }}>
          <Link to="price">Price</Link>
        </div>
      </div>
      <Outlet context={{ coinID }} />
    </Container>
  );
};

export default Coin;
