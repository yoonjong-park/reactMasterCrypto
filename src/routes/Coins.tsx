import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  a {
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 40px;
`;

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "usdt-tether",
    name: "Tether",
    symbol: "USDT",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

const Coins = () => {
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {coins.map(coin => (
          <Link to={`/${coin.id}`}>
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr; </Link>
            </Coin>
          </Link>
        ))}
      </CoinsList>
    </Container>
  );
};

export default Coins;
