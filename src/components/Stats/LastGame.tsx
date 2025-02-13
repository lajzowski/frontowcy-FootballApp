import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Team } from '../../types/team.interface.ts';
import { Game } from '../../types/game.interface.ts';
import { Card } from '../addons/Card.tsx';
import styled from 'styled-components';

const LastGameTitle = styled.p`
  font-size: 38px;
  font-weight: 400;
  margin-bottom: 10px;
  letter-spacing: 2px;
  text-align: center;
`;

const TeamStyled = styled.p`
  font-size: 32px;
  font-weight: 400;
  margin: 20px;
  text-align: center;
`;

const ScoreStyled = styled.p`
  font-size: 38px;
  font-weight: 700;
  display: inline;
  margin: 0 20px;
`;

export const LastGame = () => {
  const { data: teamsData } = useGetQuery<Team[]>('teams');
  const { data: gamesData } = useGetQuery<Game[]>('games', undefined, '-date');

  if (!teamsData || !gamesData) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <h2>Ostatnia Rozgrywka</h2>
      {gamesData.length > 0 && (
        <>
          <LastGameTitle>{gamesData[0].title}</LastGameTitle>
          <TeamStyled>
            {teamsData?.find((team) => team.id === gamesData[0].teamA)?.name}
            <ScoreStyled>
              {' '}
              {gamesData[0].scoreA} : {gamesData[0].scoreB}
            </ScoreStyled>{' '}
            {teamsData?.find((team) => team.id === gamesData[0].teamB)?.name}
          </TeamStyled>
          <p>Lokalizacja: {gamesData[0].location}</p>
          <p>Czas trwania: {gamesData[0].time}</p>
          <p>Data: {new Date(gamesData[0].date).toISOString().split('T')[0]}</p>
        </>
      )}
    </Card>
  );
};
