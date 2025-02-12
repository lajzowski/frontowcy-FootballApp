import styled from 'styled-components';

const Div = styled.div`
  background-color: ${({ theme }) => theme.dark.errorMessageBgColor};
  color: ${({ theme }) => theme.dark.errorMessageTextColor};
  border: 1px solid red;
`;

export const ErrorMessage = Div;
