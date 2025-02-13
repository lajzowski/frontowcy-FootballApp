import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

const Button = styled.button`
  border: none;
  border-radius: 50%;
  background: none;
  width: 30px;
  height: 30px;
  margin: 0 2px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonRadiusBgColor};
    cursor: pointer;
  }
`;

export const ButtonDelete = (
  props: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>
) => {
  return <Button {...props}>🗑️</Button>;
};
