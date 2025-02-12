import Modal from 'react-modal';
import { ReactNode } from 'react';

interface Props {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const ModalEdit = (props: Props) => {
  return (
    <Modal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={props.isOpen}
      //  onRequestClose={closeModal}
      contentLabel={props.title}
      style={{
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '150px',
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
        }}
      >
        ×
      </button>
      <p>{props.title}</p>
      {props.children}
    </Modal>
  );
};
