import Modal from "./Modal";

interface PromptModalProps {
  title: string;
  message: string;
  show: boolean;
  hide: (result: boolean) => void;
}

function PromptModal(props: PromptModalProps) {
  return (
    <Modal show={props.show}>
      {(isShown) => {
        return (
          <>
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
            </div>
            <div className="modal-body">
              <p className="mb-0">{props.message}</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-default"
                onClick={() => props.hide(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary px-3"
                onClick={() => props.hide(true)}
              >
                OK
              </button>
            </div>
          </>
        );
      }}
    </Modal>
  );
}

export default PromptModal;
