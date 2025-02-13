import Modal from 'react-modal';
import { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';

interface Props {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const ModalTitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  letter-spacing: 2px;
`;

export const ModalEdit = (props: Props) => {
  const theme = useTheme();
  return (
    <Modal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={props.isOpen}
      contentLabel={props.title}
      style={{
        content: {
          color: theme.colors.text,
          top: '50%',
          left: '50%',

          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: 'fit-content',
          textAlign: 'center',
          maxWidth: '100%',
          maxHeight: '90%',
          backgroundColor: theme.colors.listBackground,
        },
      }}
    >
      <button
        onClick={() => props.onClose()}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          color: theme.colors.text,
        }}
      >
        ×
      </button>
      <ModalTitle>{props.title}</ModalTitle>
      {props.children}
    </Modal>
  );
};
