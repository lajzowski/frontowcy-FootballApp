import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { Team } from '../../types/team.interface.ts';

interface Props {
  onSave: () => void;
}

export const TeamAdd = (props: Props) => {
  const { mutate } = useCreateMutation<Team>('teams');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [newTeam, setNewTeam] = useState<Omit<Team, 'id'>>({
    name: '',
    location: '',
    yearOfEstablishment: 0,
  });

  const queryClient = useQueryClient();

  const handleAddTeam = () => {
    if (newTeam.name === '' || newTeam.location === '')
      return setErrorMessage('Nie wprowadziłeś wymaganych danych drużyny');

    if (!/^\d{4}$/.test(newTeam.yearOfEstablishment.toString())) {
      return setErrorMessage('Rok założenia jest niepoprawny.');
    }

    mutate(
      {
        ...newTeam,
      },
      {
        onSuccess: async (team) => {
          /*          // odświeżanie danych
          queryClient.invalidateQueries({
            queryKey: ['players'],
          });*/

          // dodawanie 1 pozycji do danych
          queryClient.setQueryData<Team[]>(['teams'], (oldData) => [
            ...(oldData || []),
            team,
          ]);

          setNewTeam({ name: '', location: '', yearOfEstablishment: 0 });
          props.onSave();
        },
      }
    );
  };

  const handleInputChange = (field: keyof Team, value: string) => {
    setErrorMessage('');
    setNewTeam((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <input
        type='text'
        placeholder={'Nazwa Drużyny'}
        value={newTeam.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <input
        type='text'
        placeholder={'Lokalizacja'}
        value={newTeam.location}
        onChange={(e) => handleInputChange('location', e.target.value)}
      />

      <input
        type='text'
        placeholder={'rok założenia'}
        value={newTeam.yearOfEstablishment}
        onChange={(e) =>
          handleInputChange('yearOfEstablishment', e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTeam();
          }
        }}
      />

      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonPrimary onClick={handleAddTeam} disabled={errorMessage !== ''}>
        Dodaj
      </ButtonPrimary>
    </div>
  );
};
