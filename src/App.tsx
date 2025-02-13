import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PlayersList } from './components/Players/PlayersList.tsx';
import styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { TeamsList } from './components/Teams/TeamsList.tsx';
import { GamesList } from './components/Games/GamesList.tsx';

const queryClient = new QueryClient();

const theme = {
  light: {
    fg: '#000000',
    bg: '#FFFFFF',
  },
  dark: {
    buttonBgColor: '#533f3f',
    buttonTextColor: '#FFFFFF',
  },
};

const MenuItem = styled.li`
  a {
    color: ${({ theme }) => theme.light.fg};
    text-decoration: none;
    font-size: 16px;

    &:hover {
      color: ${({ theme }) => theme.dark.buttonTextColor};
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 24px;
  padding: 0;
  margin: 16px 0;
  list-style: none;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

type Route = 'players' | 'teams' | 'games' | 'stats';

export const App = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('players');

  const handleRouteChange = (route: Route) => {
    setCurrentRoute(route);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Main>
          <h1>Frontowcy - FootballApp</h1>

          <nav>
            <Menu>
              <MenuItem>
                <p onClick={() => handleRouteChange('players')}>Gracze</p>
              </MenuItem>
              <MenuItem>
                <p onClick={() => handleRouteChange('teams')}>Drużyny</p>
              </MenuItem>
              <MenuItem>
                <p onClick={() => handleRouteChange('games')}>Rozgrywki</p>
              </MenuItem>
              <MenuItem>
                <p onClick={() => handleRouteChange('stats')}>Statystyki</p>
              </MenuItem>
            </Menu>
          </nav>

          {currentRoute === 'players' && <PlayersList />}
          {currentRoute === 'teams' && <TeamsList />}
          {currentRoute === 'games' && <GamesList />}
        </Main>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
