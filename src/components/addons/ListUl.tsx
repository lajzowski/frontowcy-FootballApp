import styled from 'styled-components';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  li {
    display: flex;
    background-color: ${({ theme }) => theme.colors.listBackground};
    border-radius: 5px;
    transition: background-color 0.3s;
    justify-content: space-between;

    padding: 0 10px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.listBackgroundHover};
    }
  }
`;

export const ListUl = Ul;
