import { Player } from '../../types/player.interface.ts';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useState } from 'react';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';

interface Props {
  player: Player;
  onSave: () => void;
}

export const PlayerEdit = (props: Props) => {
  const { mutate } = useCreateMutation<Player>(
    `players/${props.player.id}`,
    'PATCH'
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [player, setPlayer] = useState<Player>(props.player);

  const queryClient = useQueryClient();

  const handleChangePlayer = () => {
    if (player.name === '' || player.surname === '')
      return setErrorMessage('Nie wprowadziłeś wymaganych danych gracza');

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
          queryClient.setQueryData<Player[]>(['players'], (oldData) =>
            (oldData ? oldData : []).map((p) =>
              p.id === player.id ? player : p
            )
          );
          props.onSave();
        },
      }
    );
  };

  const handleInputChange = (field: keyof Player, value: string) => {
    setErrorMessage('');
    setPlayer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <input type={'hidden'} value={player.id} />
      <input
        type='text'
        placeholder={'Imię'}
        value={player.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <input
        type='text'
        placeholder={'Nazwisko'}
        value={player.surname}
        onChange={(e) => handleInputChange('surname', e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleChangePlayer();
          }
        }}
      />
      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonPrimary
        onClick={handleChangePlayer}
        disabled={errorMessage !== ''}
      >
        Zapisz
      </ButtonPrimary>
    </div>
  );
};
