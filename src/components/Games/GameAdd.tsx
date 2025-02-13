import { useCreateMutation } from '../../hooks/useCreateMutation.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ErrorMessage } from '../addons/ErrorMessage.tsx';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { Game } from '../../types/game.interface.ts';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Team } from '../../types/team.interface.ts';

interface Props {
  onSave: () => void;
}

export const GameAdd = (props: Props) => {
  const { mutate } = useCreateMutation<Game>('games');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [newGame, setNewGame] = useState<Omit<Game, 'id'> | undefined>(
    undefined
  );

  const { data } = useGetQuery<Team[]>('teams');

  const queryClient = useQueryClient();

  const handleAddGame = () => {
    if (
      !newGame?.title ||
      !newGame?.location ||
      !newGame?.time ||
      newGame?.time <= 0 ||
      !newGame?.date ||
      !newGame?.teamA ||
      !newGame?.teamB
    )
      return setErrorMessage('Nie wprowadziłeś wymaganych danych Rozgrywki');

    mutate(
      {
        ...newGame,
      },
      {
        onSuccess: async (game) => {
          /*          // odświeżanie danych
          queryClient.invalidateQueries({
            queryKey: ['players'],
          });*/

          // dodawanie 1 pozycji do danych
          queryClient.setQueryData<Game[]>(['games'], (oldData) => [
            ...(oldData || []),
            game,
          ]);

          setNewGame(undefined);
          props.onSave();
        },
      }
    );
  };

  const handleInputChange = (
    field: keyof Game,
    value: string | number | Date
  ) => {
    setErrorMessage('');
    setNewGame(
      (prev) =>
        ({
          ...prev,
          [field]: value,
        }) as Omit<Game, 'id'>
    );
  };

  return (
    <div>
      <input
        type='text'
        placeholder={'Tytuł Rozgrywki'}
        value={newGame?.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
      />
      <input
        type='text'
        placeholder={'Lokalizacja'}
        value={newGame?.location}
        onChange={(e) => handleInputChange('location', e.target.value)}
      />

      <input
        type='number'
        placeholder={'Czas trwania rozgrywki'}
        value={newGame?.time}
        onChange={(e) => handleInputChange('time', Number(e.target.value))}
      />

      <input
        type='date'
        placeholder={'Data'}
        value={
          newGame?.date
            ? new Date(newGame.date).toISOString().split('T')[0]
            : ''
        }
        onChange={(e) => handleInputChange('date', new Date(e.target.value))}
      />

      {data && (
        <select
          value={newGame?.teamA || ''}
          onChange={(e) => handleInputChange('teamA', e.target.value)}
        >
          <option value='' disabled>
            Wybierz Drużynę A
          </option>
          {data.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      )}

      <input
        disabled={newGame?.teamA === undefined || newGame?.teamA.length === 0}
        type='number'
        placeholder={'Liczba Goli'}
        value={newGame?.scoreA}
        onChange={(e) => handleInputChange('scoreA', Number(e.target.value))}
      />

      {data && (
        <select
          value={newGame?.teamB || ''}
          onChange={(e) => handleInputChange('teamB', e.target.value)}
        >
          <option value='' disabled>
            Wybierz Drużynę B
          </option>
          {data.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      )}

      <input
        disabled={newGame?.teamB === undefined || newGame?.teamB.length === 0}
        type='number'
        placeholder={'Liczba Goli'}
        value={newGame?.scoreB}
        onChange={(e) => handleInputChange('scoreB', Number(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddGame();
          }
        }}
      />

      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonPrimary onClick={handleAddGame} disabled={errorMessage !== ''}>
        Dodaj
      </ButtonPrimary>
    </div>
  );
};
