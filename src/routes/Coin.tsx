import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api/api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const Tab = styled.div<{ isActice: boolean }>`
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
  text-align: center;
  font-size: 26px;
  text-transform: uppercase;
  font-weight: 400;

  a {
    display: block;
    color: ${(props) =>
      !props.isActice ? props.theme.accentColor : props.theme.textColor};
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const CoinInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  gap: 10px;
`;

const Description = styled.p`
  font-size: 25px;
  margin: 20px 0px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
`;

const Back = styled.button`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 10px 40px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 15px;
  margin: 20px;
`;

interface RouteParams {
  [key: string]: string | undefined;
}
interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
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
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface IMode {
  onClick: () => void;
}

function Coin() {

  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation();
  const route = useNavigate();
  const onBack = () => {
    route("/");
  };

  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : infoLoading
            ? "Loading..."
            : infoData?.name}
        </title>
      </Helmet>
      <Wrapper>
        
        <Back onClick={onBack}>Back</Back>
      </Wrapper>

      <Header>
        <Title>
          {state?.name
            ? state.name
            : infoLoading
            ? "Loading..."
            : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <CoinInfo>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol :</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price : </span>
              <span>{tickersData?.quotes?.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </CoinInfo>
          <Description>{infoData?.description}</Description>
          <CoinInfo>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </CoinInfo>
          <Tabs>
            <Tab isActice={chartMatch !== null}>
              <Link to={`price`}>Price</Link>
            </Tab>
            <Tab isActice={priceMatch !== null}>
              <Link to={`chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
