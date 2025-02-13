import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { ButtonEdit } from '../addons/ButtonEdit.tsx';
import { useState } from 'react';
import { ModalEdit } from '../addons/ModalEdit.tsx';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { ListUl } from '../addons/ListUl.tsx';
import styled from 'styled-components';
import { Game } from '../../types/game.interface.ts';
import { GameAdd } from './GameAdd.tsx';
import { Team } from '../../types/team.interface.ts';
import { GameEdit } from './GameEdit.tsx';

const ButtonsGroup = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const GamesList = () => {
  const { data } = useGetQuery<Game[]>('games');
  const { data: teamsData } = useGetQuery<Team[]>('teams');
  const [editableGame, setEditableGame] = useState<Game | null>(null);
  const [modalAddGameOpened, setModalAddGameOpened] = useState(false);

  if (!data || !teamsData) return <div>Loading...</div>;

  return (
    <>
      <h2>Rozgrywki</h2>
      <ListUl>
        {data.map((game) => (
          <li key={game.id}>
            <p>
              {teamsData?.find((team) => team.id === game.teamA)?.name} (
              {game.scoreA} : {game.scoreB}){' '}
              {teamsData?.find((team) => team.id === game.teamB)?.name}
            </p>
            <ButtonsGroup>
              <ButtonEdit onClick={() => setEditableGame(game)} />
            </ButtonsGroup>
          </li>
        ))}
      </ListUl>

      <ButtonPrimary onClick={() => setModalAddGameOpened(true)}>
        Dodaj Rozgrywkę
      </ButtonPrimary>

      <ModalEdit
        title={'Dodaj Rozgrywkę'}
        isOpen={modalAddGameOpened}
        onClose={() => setModalAddGameOpened(false)}
      >
        <GameAdd onSave={() => setModalAddGameOpened(false)} />
      </ModalEdit>

      <ModalEdit
        title={'Edycja Drużyny'}
        isOpen={!!editableGame}
        onClose={() => setEditableGame(null)}
      >
        {editableGame && (
          <GameEdit onSave={() => setEditableGame(null)} game={editableGame} />
        )}
      </ModalEdit>
    </>
  );
};
