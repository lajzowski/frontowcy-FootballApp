import { ButtonDelete } from '../addons/ButtonDelete.tsx';
import { Player } from '../../types/player.interface.ts';
import { useEffect, useState } from 'react';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';
import { ModalYesNo } from '../addons/ModalYesNo.tsx';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';
import { Team } from '../../types/team.interface.ts';

interface Props {
  player: Player;
  team: Team;
}

export const TeamPlayerDelete = (props: Props) => {
  const [player, setPlayer] = useState<Player>(props.player);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessaage] = useState('');
  const { mutate } = useCreateMutation<Player>(
    `players/${props.player.id}`,
    'PUT'
  );

  useEffect(() => {
    setPlayer(props.player);
  }, [props.player]);

  const queryClient = useQueryClient();

  const handleDeletePlayer = () => {
    mutate(
      {
        ...player,
        teamId: null,
      },
      {
        onSuccess: async () => {
          // odświeżanie danych
          await queryClient.invalidateQueries({
            queryKey: ['teams', props.team.id],
          });
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
        onYes={handleDeletePlayer}
        isOpen={showConfirmModal}
        onNo={() => {
          setShowConfirmModal(false);
          setErrorMessaage('');
        }}
        query={'Czy na pewno chcesz usunąć gracza z drużyny?'}
        content={
          <>
            Gracz: {player.name} {player.surname}
            {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </>
        }
      />
    </>
  );
};
