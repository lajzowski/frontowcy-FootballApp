import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonBgColor};
  color: ${({ theme }) => theme.colors.buttonTextColor};
  margin: 10px;
  border-radius: 5px;
  padding: 5px 10px;
`;

export const ButtonPrimary = Button;
