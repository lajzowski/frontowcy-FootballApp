import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Player } from '../../types/player.interface.ts';
import { ButtonEdit } from '../addons/ButtonEdit.tsx';
import { useState } from 'react';
import { PlayerEdit } from './PlayerEdit.tsx';
import { ModalEdit } from '../addons/ModalEdit.tsx';
import { PlayerAdd } from './PlayerAdd.tsx';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { PlayerDelete } from './PlayerDelete.tsx';
import { ListUl } from '../addons/ListUl.tsx';
import styled from 'styled-components';

const ButtonsGroup = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const PlayersList = () => {
  const { data } = useGetQuery<Player[]>('players');
  const [editablePlayer, setEditablePlayer] = useState<Player | null>(null);
  const [modalAddPlayerOpened, setModalAddPlayerOpened] = useState(false);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <h2>Gracze</h2>
      <ListUl>
        {data.map((player) => (
          <li key={player.id}>
            <p>
              {player.name} {player.surname}
            </p>
            <ButtonsGroup>
              <ButtonEdit onClick={() => setEditablePlayer(player)} />
              <PlayerDelete player={player} />
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
        <PlayerAdd onSave={() => setModalAddPlayerOpened(false)} />
      </ModalEdit>

      <ModalEdit
        title={'Edycja Gracza'}
        isOpen={!!editablePlayer}
        onClose={() => setEditablePlayer(null)}
      >
        {editablePlayer && (
          <PlayerEdit
            onSave={() => setEditablePlayer(null)}
            player={editablePlayer}
          />
        )}
      </ModalEdit>
    </>
  );
};
