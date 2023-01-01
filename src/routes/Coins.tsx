import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCoins } from "APIs/get";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "atoms";

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
  margin-bottom: 10px;
  border-radius: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
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

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Text = styled.span`
  color: ${props => props.theme.textColor};
  padding-top: 4px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", getCoins, {
    select: data => data.slice(0, 30),
  });

  return (
    <Container>
      <Header>
        <Title>Coin list</Title>
        <button onClick={toggleDarkAtom}>Toggle</button>
      </Header>
      {isLoading ? (
        <Loader>loading...</Loader>
      ) : (
        <CoinsList>
          {data?.map(coin => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                />
                <Text>{coin.name} &rarr;</Text>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
