import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { ButtonEdit } from '../addons/ButtonEdit.tsx';
import { useState } from 'react';
import { ModalEdit } from '../addons/ModalEdit.tsx';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { ListUl } from '../addons/ListUl.tsx';
import styled from 'styled-components';
import { Team } from '../../types/team.interface.ts';
import { TeamDelete } from './TeamDelete.tsx';
import { TeamAdd } from './TeamAdd.tsx';
import { TeamEdit } from './TeamEdit.tsx';
import { PlayersWithTeamList } from './PlayersWithTeamList.tsx';

const ButtonsGroup = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const TeamsList = () => {
  const { data } = useGetQuery<Team[]>('teams');
  const [editableTeam, setEditableTeam] = useState<Team | null>(null);
  const [modalAddTeamOpened, setModalAddTeamOpened] = useState(false);

  const [clickedTeam, setClickedTeam] = useState<Team | null>(null);

  if (!data) return <div>Loading...</div>;

  if (clickedTeam) {
    return (
      <PlayersWithTeamList
        back={() => setClickedTeam(null)}
        team={clickedTeam}
      />
    );
  }

  return (
    <>
      <h2>Drużyny</h2>
      <ListUl>
        {data.map((team) => (
          <li key={team.id}>
            <p onClick={() => setClickedTeam(team)}>{team.name}</p>
            <ButtonsGroup>
              <ButtonEdit onClick={() => setEditableTeam(team)} />
              <TeamDelete team={team} />
            </ButtonsGroup>
          </li>
        ))}
      </ListUl>

      <ButtonPrimary onClick={() => setModalAddTeamOpened(true)}>
        Dodaj Team
      </ButtonPrimary>

      <ModalEdit
        title={'Dodaj Drużynę'}
        isOpen={modalAddTeamOpened}
        onClose={() => setModalAddTeamOpened(false)}
      >
        <TeamAdd onSave={() => setModalAddTeamOpened(false)} />
      </ModalEdit>

      <ModalEdit
        title={'Edycja Drużyny'}
        isOpen={!!editableTeam}
        onClose={() => setEditableTeam(null)}
      >
        {editableTeam && (
          <TeamEdit onSave={() => setEditableTeam(null)} team={editableTeam} />
        )}
      </ModalEdit>
    </>
  );
};
