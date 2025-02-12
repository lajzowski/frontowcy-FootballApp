import Modal from 'react-modal';
import { ReactNode } from 'react';

Modal.setAppElement('#root'); // Ustaw główny element aplikacji

interface Props {
  query: string;
  isOpen: boolean;
  onYes: () => void;
  onNo: () => void;
  content?: string | ReactNode;
}

export const ModalYesNo = ({ isOpen, onYes, onNo, query, content }: Props) => {
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
        },
      }}
    >
      <h2>{query}</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {content && <div>{content}</div>}

        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <button
            onClick={onYes}
            style={{ background: 'red', color: 'white', margin: '5px' }}
          >
            TAK
          </button>
          <button
            onClick={onNo}
            style={{ background: 'gray', color: 'white', margin: '5px' }}
          >
            NIE
          </button>
        </div>
      </div>
    </Modal>
  );
};
