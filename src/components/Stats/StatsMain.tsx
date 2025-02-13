import styled from 'styled-components';
import { LastGame } from './LastGame.tsx';
import { TopThreeTeams } from './TopThreeTeams.tsx';
import { Chart } from './Chart.tsx';

const Main = styled.div`
  width: 100%;
`;

export const StatsMain = () => {
  return (
    <Main>
      <h2>Statystyki</h2>
      <LastGame />
      <TopThreeTeams />
      <Chart />
    </Main>
  );
};
