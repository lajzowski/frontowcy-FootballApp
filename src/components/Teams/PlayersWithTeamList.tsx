import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { useState } from 'react';
import { ModalEdit } from '../addons/ModalEdit.tsx';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { ListUl } from '../addons/ListUl.tsx';
import styled from 'styled-components';
import { Team } from '../../types/team.interface.ts';
import { TeamWithPlayers } from '../../types/team-with-players.interface.ts';
import { ButtonBack } from '../addons/ButtonBack.tsx';
import { TeamAddPlayer } from './TeamAddPlayer.tsx';
import { TeamPlayerDelete } from './TeamPlayerDelete.tsx';

const ButtonsGroup = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

interface Props {
  team: Team;
  back: () => void;
}

export const PlayersWithTeamList = (props: Props) => {
  const { data } = useGetQuery<TeamWithPlayers>(
    `teams/${props.team.id}`,
    'players'
  );
  const [modalAddPlayerOpened, setModalAddPlayerOpened] = useState(false);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <h2>
        <ButtonBack onClick={props.back} />
        {data.name} - Gracze
      </h2>

      <ListUl>
        {data.players.map((player) => (
          <li key={player.id}>
            <p>
              {player.name} {player.surname}
            </p>
            <ButtonsGroup>
              <TeamPlayerDelete team={props.team} player={player} />
            </ButtonsGroup>
          </li>
        ))}
      </ListUl>

      <ButtonPrimary onClick={() => setModalAddPlayerOpened(true)}>
        Dodaj Gracza
      </ButtonPrimary>

      <ModalEdit
        title={'Dodaj Gracza'}
        isOpen={modalAddPlayerOpened}
        onClose={() => setModalAddPlayerOpened(false)}
      >
        <div></div>
        <TeamAddPlayer
          team={data}
          onSave={() => setModalAddPlayerOpened(false)}
        />
      </ModalEdit>
    </>
  );
};
