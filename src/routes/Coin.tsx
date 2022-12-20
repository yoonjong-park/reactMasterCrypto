import React, { useState, useEffect } from "react";
import {
  Params,
  useParams,
  useLocation,
  Outlet,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { getCoin, getCoinPrice } from "APIs/get";
import { Link } from "react-router-dom";
import { theme } from "theme";

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
  const { coinID } = useParams<RouteParams>();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const { state } = useLocation() as RouteState;
  const [loading, setLoading] = useState(true);
  const matchedPrice = useMatch(`${coinID}/price`);
  const matchedChart = useMatch(`${coinID}/chart`);
  console.log("matchedPrice", matchedPrice);
  console.log("matchedChart", matchedChart);

  useEffect(() => {
    (async () => {
      const infoData = await getCoin(coinID);
      const priceData = await getCoinPrice(coinID);
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinID]); // dependency를 넣는 게 더 나은 성능을 가져온다고 한다.

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? (
            state.name
          ) : loading ? (
            <Loader>loading...</Loader>
          ) : (
            info?.name
          )}
        </Title>
      </Header>
      {loading ? <Loader>loading...</Loader> : <div>{info?.description}</div>}

      <Outlet />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            border: "1px solid white",
            textAlign: "center",
            padding: "20px",
            color: matchedChart !== null ? theme.accentColor : theme.textColor,
          }}>
          <Link to="chart">Chart</Link>
        </div>
        <div
          style={{
            border: "1px solid white",
            textAlign: "center",
            padding: "20px",
            color: matchedPrice !== null ? theme.accentColor : theme.textColor,
          }}>
          <Link to="price">Price</Link>
        </div>
      </div>
    </Container>
  );
};

export default Coin;
