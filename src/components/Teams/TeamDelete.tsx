import { ButtonDelete } from '../addons/ButtonDelete.tsx';
import { useEffect, useState } from 'react';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';
import { ModalYesNo } from '../addons/ModalYesNo.tsx';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';
import { Team } from '../../types/team.interface.ts';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Player } from '../../types/player.interface.ts';
import { Game } from '../../types/game.interface.ts';

interface Props {
  team: Team;
}

export const TeamDelete = (props: Props) => {
  const [team, setTeam] = useState<Team>(props.team);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate } = useCreateMutation<Team>(
    `teams/${props.team.id}`,
    'DELETE'
  );

  const { data: playersData } = useGetQuery<Player[]>('players');
  const { data: gamesData } = useGetQuery<Game[]>('games');

  useEffect(() => {
    setTeam(props.team);
  }, [props.team]);

  const queryClient = useQueryClient();

  const handleDeleteTeam = async () => {
    if (playersData?.some((player) => player.teamId === team.id)) {
      setErrorMessage('Do teamu są przypisani gracze!');
      return;
    }

    if (
      gamesData?.some(
        (game) => game.teamA === team.id || game.teamB === team.id
      )
    ) {
      setErrorMessage('Team ma już rozegrane gry!');
      return;
    }

    mutate(
      {
        ...team,
      },
      {
        onSuccess: async (team) => {
          /*          // odświeżanie danych
          queryClient.invalidateQueries({
            queryKey: ['players'],
          });*/

          // dodawanie 1 pozycji do danych
          queryClient.setQueryData<Team[]>(['teams'], (oldData) => [
            ...(oldData || []).filter((p) => p.id !== team.id),
          ]);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <>
      <ButtonDelete onClick={() => setShowConfirmModal(true)} />
      <ModalYesNo
        onYes={handleDeleteTeam}
        isOpen={showConfirmModal}
        onNo={() => {
          setShowConfirmModal(false);
          setErrorMessage('');
        }}
        query={'Czy na pewno chcesz usunąć drużynę?'}
        content={
          <>
            Drużyna: {team.name}
            {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </>
        }
      />
    </>
  );
};
