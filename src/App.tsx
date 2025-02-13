import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PlayersList } from './components/Players/PlayersList.tsx';
import styled, { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { TeamsList } from './components/Teams/TeamsList.tsx';
import { GamesList } from './components/Games/GamesList.tsx';
import { StatsMain } from './components/Stats/StatsMain.tsx';
import { GlobalStyle } from './components/layout/Styles/GlobalStyle.tsx';
import { darkTheme, lightTheme } from './components/layout/Styles/theme.ts';

const queryClient = new QueryClient();

const MenuItem = styled.li`
  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px;

    &:hover {
      color: ${({ theme }) => theme.colors.linkHover};
      border-bottom: 2px solid ${({ theme }) => theme.colors.linkHover};
      cursor: pointer;
    }
  }
`;

const Nav = styled.nav`
  height: 50px;
  margin-bottom: 32px;
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

const ButtonChangeTheme = styled.button`
  background: none;
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 48px;
  cursor: pointer;
`;

type Route = 'players' | 'teams' | 'games' | 'stats';

export const App = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('players');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleRouteChange = (route: Route) => {
    setCurrentRoute(route);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />

        <ButtonChangeTheme onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? '🌙' : '☀️'}
        </ButtonChangeTheme>

        <Main>
          <h1>Frontowcy - FootballApp</h1>
          <Nav>
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
          </Nav>

          {currentRoute === 'players' && <PlayersList />}
          {currentRoute === 'teams' && <TeamsList />}
          {currentRoute === 'games' && <GamesList />}
          {currentRoute === 'stats' && <StatsMain />}
        </Main>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
