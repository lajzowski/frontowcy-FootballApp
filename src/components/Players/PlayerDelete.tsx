import { ButtonDelete } from '../addons/ButtonDelete.tsx';
import { Player } from '../../types/player.interface.ts';
import { useEffect, useState } from 'react';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';
import { ModalYesNo } from '../addons/ModalYesNo.tsx';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';

interface Props {
  player: Player;
}

export const PlayerDelete = (props: Props) => {
  const [player, setPlayer] = useState<Player>(props.player);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessaage] = useState('');
  const { mutate } = useCreateMutation<Player>(
    `players/${props.player.id}`,
    'DELETE'
  );

  useEffect(() => {
    setPlayer(props.player);
  }, [props.player]);

  const queryClient = useQueryClient();

  const handleDeletePlayer = () => {
    console.log(`kliknięto usuń:  ${player.id}`);

    if (player.teamId !== null) {
      setErrorMessaage('Gracz należy do drużyny. Nie można go usunąć!');
      return;
    }

    mutate(
      {
        ...player,
      },
      {
        onSuccess: async (player) => {
          /*          // odświeżanie danych
          queryClient.invalidateQueries({
            queryKey: ['players'],
          });*/

          // dodawanie 1 pozycji do danych
          queryClient.setQueryData<Player[]>(['players'], (oldData) => [
            ...(oldData || []).filter((p) => p.id !== player.id),
          ]);

          console.log(`USUNIĘTO GRACZA: ${player.name} ${player.surname}`);
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
        query={'Czy na pewno chcesz usunąć gracza?'}
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
