import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { Player } from '../../types/player.interface.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';

interface Props {
  onSave: () => void;
}

export const PlayerAdd = (props: Props) => {
  const { mutate } = useCreateMutation<Player>('players');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [newPlayer, setNewPlayer] = useState<Omit<Player, 'id'>>({
    name: '',
    surname: '',
    teamId: null,
  });

  const queryClient = useQueryClient();

  const handleAddPlayer = () => {
    if (newPlayer.name === '' || newPlayer.surname === '')
      return setErrorMessage('Nie wprowadziłeś wymaganych danych gracza');

    mutate(
      {
        ...newPlayer,
      },
      {
        onSuccess: async (player) => {
          /*          // odświeżanie danych
          queryClient.invalidateQueries({
            queryKey: ['players'],
          });*/

          // dodawanie 1 pozycji do danych
          queryClient.setQueryData<Player[]>(['players'], (oldData) => [
            ...(oldData || []),
            player,
          ]);

          setNewPlayer({ name: '', surname: '', teamId: null });
          props.onSave();
        },
      }
    );
  };

  const handleInputChange = (field: keyof Player, value: string) => {
    setErrorMessage('');
    setNewPlayer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <input
        type='text'
        placeholder={'Imię'}
        value={newPlayer.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <input
        type='text'
        placeholder={'Nazwisko'}
        value={newPlayer.surname}
        onChange={(e) => handleInputChange('surname', e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddPlayer();
          }
        }}
      />
      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonPrimary onClick={handleAddPlayer} disabled={errorMessage !== ''}>
        Dodaj
      </ButtonPrimary>
    </div>
  );
};
