import styled from 'styled-components';

const Div = styled.div`
  background-color: ${({ theme }) => theme.colors.errorMessageBgColor};
  color: ${({ theme }) => theme.colors.errorMessageTextColor};
  border: 1px solid red;

  border-radius: 5px;
  padding: 10px;
  letter-spacing: 1px;
  text-align: left;
`;

export const ErrorMessage = Div;
