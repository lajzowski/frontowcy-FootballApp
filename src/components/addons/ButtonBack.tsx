import styled from 'styled-components';

const Button = styled.button`
  width: 30px;
  height: 30px;
  margin: 0 2px;
  border: none;
  border-radius: 50%;
  background: none;

  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

export const ButtonBack = (
  props: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>
) => {
  return <Button {...props}>↩️</Button>;
};
