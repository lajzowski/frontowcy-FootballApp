import styled from 'styled-components';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Team } from '../../types/team.interface.ts';
import { Game } from '../../types/game.interface.ts';

const LastGameMain = styled.div``;

export const LastGame = () => {
  const { data: teamsData } = useGetQuery<Team[]>('teams');
  const { data: gamesData } = useGetQuery<Game[]>('games', undefined, '-date');

  if (!teamsData || !gamesData) {
    return <div>Loading...</div>;
  }

  return (
    <LastGameMain>
      <h3>Ostatnia Rozgrywka</h3>
      {gamesData.length > 0 && (
        <>
          <p>Tytuł: {gamesData[0].title}</p>
          <p>
            {teamsData?.find((team) => team.id === gamesData[0].teamA)?.name} (
            {gamesData[0].scoreA} : {gamesData[0].scoreB}){' '}
            {teamsData?.find((team) => team.id === gamesData[0].teamB)?.name}
          </p>
          <p>Lokalizacja: {gamesData[0].location}</p>
          <p>Czas trwania: {gamesData[0].time}</p>
          <p>Data: {new Date(gamesData[0].date).toISOString().split('T')[0]}</p>
        </>
      )}
    </LastGameMain>
  );
};
