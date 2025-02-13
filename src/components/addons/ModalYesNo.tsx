import Modal from 'react-modal';
import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';

Modal.setAppElement('#root'); // Ustaw główny element aplikacji

interface Props {
  query: string;
  isOpen: boolean;
  onYes: () => void;
  onNo: () => void;
  content?: string | ReactNode;
}

const ButtonYes = styled.button`
  background: red;
  color: white;
  margin: 5px;
  width: 40px;
  height: 25px;
  border-radius: 5px;
`;

const ButtonNo = styled.button`
  background: gray;
  color: white;
  margin: 5px;
  width: 40px;
  height: 25px;
  border-radius: 5px;
`;

export const ModalYesNo = ({ isOpen, onYes, onNo, query, content }: Props) => {
  const theme = useTheme();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onNo}
      contentLabel={query}
      style={{
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '250px',
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <h2>{query}</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {content && <div>{content}</div>}

        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <ButtonYes onClick={onYes}>TAK</ButtonYes>
          <ButtonNo
            onClick={onNo}
            style={{ background: 'gray', color: 'white', margin: '5px' }}
          >
            NIE
          </ButtonNo>
        </div>
      </div>
    </Modal>
  );
};
