import styled from 'styled-components';

const CardStyled = styled.div`
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.listBorderColor};
  padding: 20px;
  margin: 15px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.listBackground};
`;

export const Card = CardStyled;
