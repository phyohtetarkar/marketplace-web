import { ReactNode, useState } from "react";
import Modal from "./Modal";
import ProgressButton from "./ProgressButton";

interface ConfirmModalProps {
  show: boolean;
  message: ReactNode;
  onConfirm?: () => Promise<void>;
  onHidden?: () => void;
  close?: () => void;
}

function ConfirmModal(props: ConfirmModalProps) {
  const { show, message, onConfirm, close, onHidden } = props;
  const [loading, setLoading] = useState(false);
  return (
    <Modal show={show} onHidden={onHidden}>
      {(isShown) => {
        return (
          <>
            <div className="modal-header">
              <h5 className="modal-title">Confirm</h5>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={close}
                disabled={loading}
              >
                Cancel
              </button>
              <ProgressButton
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  onConfirm?.()
                    .catch((error) => {})
                    .finally(() => {
                      setLoading(false);
                      close?.();
                    });
                }}
              >
                Proceed
              </ProgressButton>
            </div>
          </>
        );
      }}
    </Modal>
  );
}

export default ConfirmModal;
