import { Team } from '../../types/team.interface.ts';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Player } from '../../types/player.interface.ts';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useState } from 'react';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  team: Team;
  onSave: () => void;
}

export const TeamAddPlayer = (props: Props) => {
  const { data } = useGetQuery<Player[]>('players');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedPlayerId, setSelectedPlayerId] = useState<Player['id']>('');

  const { mutate } = useCreateMutation<Player>(
    `players/${selectedPlayerId}`,
    'PATCH'
  );

  const queryClient = useQueryClient();

  const handleSubmit = () => {
    if (!selectedPlayerId || selectedPlayerId === '')
      return setErrorMessage('Wybierz gracza');

    mutate(
      {
        id: selectedPlayerId,
        teamId: props.team.id,
      },

      {
        onSuccess: async () => {
          // odświeżanie danych
          await queryClient.invalidateQueries({
            queryKey: ['teams', props.team.id],
          });
          props.onSave();
        },
      }
    );
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <select onChange={(e) => setSelectedPlayerId(e.target.value)}>
        {!selectedPlayerId && <option>Nie wybrano</option>}
        {data
          .filter((p) => !p.teamId)
          .map((player) => (
            <option key={player.id} value={player.id}>
              {player.name} {player.surname}
            </option>
          ))}
      </select>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <ButtonPrimary onClick={handleSubmit}>Dodaj Gracza</ButtonPrimary>
    </div>
  );
};
