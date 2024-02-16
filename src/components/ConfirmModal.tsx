import { ReactNode, useState } from "react";
import Modal from "./Modal";
import ProgressButton from "./ProgressButton";

interface ConfirmModalProps {
  show: boolean;
  message: ReactNode;
  onConfirm?: (result: boolean) => void;
  onHidden?: () => void;
  close?: () => void;
}

function ConfirmModal(props: ConfirmModalProps) {
  const { show, message, onConfirm, close, onHidden } = props;
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
                onClick={() => {
                  close?.();
                  setTimeout(() => {
                    onConfirm?.(false);
                  }, 300);
                }}
              >
                Cancel
              </button>
              <ProgressButton
                onClick={() => {
                  // setLoading(true);
                  close?.();
                  setTimeout(() => {
                    onConfirm?.(true);
                  }, 300);
                    // .catch((error) => {})
                    // .finally(() => {
                    //   setLoading(false);
                    //   close?.();
                    // });
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
