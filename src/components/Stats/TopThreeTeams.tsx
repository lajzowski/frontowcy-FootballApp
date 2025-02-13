import styled from 'styled-components';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Game } from '../../types/game.interface.ts';
import { useEffect, useState } from 'react';
import { Team } from '../../types/team.interface.ts';

const Main = styled.div``;

interface TeamWithTotalScore extends Team {
  totalScore: number;
}

export const TopThreeTeams = () => {
  const { data: gamesData } = useGetQuery<Game[]>('games');
  const { data: teamsData } = useGetQuery<Team[]>('teams');
  const [teamWithTotalScore, setTeamWithTotalScore] = useState<
    TeamWithTotalScore[]
  >([]);

  useEffect(() => {
    getData();
  }, [gamesData, teamsData]);

  const getData = () => {
    if (!gamesData || !teamsData) return;

    const teamWithScore: TeamWithTotalScore[] = [];

    teamsData.map((team) => {
      let scoreA = 0;
      let scoreB = 0;

      gamesData.map((game) => {
        if (game.teamA === team.id) scoreA += game.scoreA;
        if (game.teamB === team.id) scoreB += game.scoreB;
      });
      teamWithScore.push({
        ...team,
        totalScore: scoreA + scoreB,
      });
    });

    setTeamWithTotalScore(
      teamWithScore.sort((a, b) => b.totalScore - a.totalScore).slice(0, 3)
    );
  };

  return (
    <Main>
      <h2>Top 3</h2>
      {teamWithTotalScore.length > 0 &&
        teamWithTotalScore.map((team, ix) => (
          <p>
            {++ix}. {team.name} {team.totalScore}
          </p>
        ))}
    </Main>
  );
};
