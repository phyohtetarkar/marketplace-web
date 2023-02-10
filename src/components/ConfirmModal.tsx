import { useState } from "react";
import Modal from "./Modal";

interface ConfirmModalProps {
  show: boolean;
  message: string;
  onConfirm?: () => Promise<void>;
  close?: () => void;
}

function ConfirmModal(props: ConfirmModalProps) {
  const { show, message, onConfirm, close } = props;
  const [loading, setLoading] = useState(false);
  return (
    <Modal show={show}>
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
              <button
                type="button"
                className="btn btn-primary"
                disabled={loading}
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
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Proceed
              </button>
            </div>
          </>
        );
      }}
    </Modal>
  );
}

export default ConfirmModal;
