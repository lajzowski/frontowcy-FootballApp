import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useState } from 'react';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { Team } from '../../types/team.interface.ts';

interface Props {
  team: Team;
  onSave: () => void;
}

export const TeamEdit = (props: Props) => {
  const { mutate } = useCreateMutation<Team>(`teams/${props.team.id}`, 'PATCH');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [team, setTeam] = useState<Team>(props.team);

  const queryClient = useQueryClient();

  const handleChangeTeam = () => {
    if (team.name === '' || team.location === '')
      return setErrorMessage('Nie wprowadziłeś wymaganych danych drużyny');

    if (!/^\d{4}$/.test(team.yearOfEstablishment.toString())) {
      return setErrorMessage('Rok założenia jest niepoprawny.');
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

          // edycja pozycji
          queryClient.setQueryData<Team[]>(['teams'], (oldData) =>
            (oldData ? oldData : []).map((t) => (t.id === team.id ? team : t))
          );
          props.onSave();
        },
      }
    );
  };

  const handleInputChange = (field: keyof Team, value: string) => {
    setErrorMessage('');
    setTeam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <input type={'hidden'} value={team.id} />
      <input
        type='text'
        placeholder={'Nazwa Drużyny'}
        value={team.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <input
        type='text'
        placeholder={'Lokalizacja'}
        value={team.location}
        onChange={(e) => handleInputChange('location', e.target.value)}
      />

      <input
        type='text'
        placeholder={'rok założenia'}
        value={team.yearOfEstablishment}
        onChange={(e) =>
          handleInputChange('yearOfEstablishment', e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleChangeTeam();
          }
        }}
      />
      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonPrimary onClick={handleChangeTeam} disabled={errorMessage !== ''}>
        Zapisz
      </ButtonPrimary>
    </div>
  );
};
