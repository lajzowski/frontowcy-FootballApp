import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.dark.buttonBgColor};
  color: ${({ theme }) => theme.dark.buttonTextColor};
  margin: 10px;
`;

export const ButtonPrimary = Button;
