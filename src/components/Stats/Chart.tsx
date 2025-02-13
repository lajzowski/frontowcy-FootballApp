import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useGetQuery } from '../../hooks/useGetQuery.ts';
import { Game } from '../../types/game.interface.ts';
import 'chart.js/auto';
import { ButtonPrimary } from '../addons/ButtonPrimary.tsx';
import { Card } from '../addons/Card.tsx';
import styled from 'styled-components';

const Selected = styled.div`
  position: relative;
  right: 10px;
  top: 10px;
  text-align: right;
  font-size: 24px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
`;

export const Chart = () => {
  const { data: gamesData } = useGetQuery<Game[]>('games');

  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

  const filteredData = gamesData?.reduce(
    (acc, game) => {
      const date = new Date(game.date);
      const dateKey =
        timeRange === 'day'
          ? date.toDateString()
          : timeRange === 'week'
            ? `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`
            : `${date.getFullYear()}-${date.getMonth() + 1}`;
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = {
    labels: filteredData ? Object.keys(filteredData) : [],
    datasets: [
      {
        label: 'Ilość Rozgrywek',
        data: filteredData ? Object.values(filteredData) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Card>
      <h2>Wykres</h2>
      <Selected>
        {timeRange === 'day'
          ? 'Dzienny'
          : timeRange === 'week'
            ? 'Tygodniowy'
            : timeRange === 'month'
              ? 'Miesięczny'
              : ''}
      </Selected>
      <div>
        <ButtonPrimary onClick={() => setTimeRange('day')}>
          Dzienny
        </ButtonPrimary>
        <ButtonPrimary onClick={() => setTimeRange('week')}>
          Tygodniowy
        </ButtonPrimary>
        <ButtonPrimary onClick={() => setTimeRange('month')}>
          Miesięczny
        </ButtonPrimary>
      </div>
      <div>
        <Bar lang={'pl-PL'} data={chartData} />
      </div>
    </Card>
  );
};
