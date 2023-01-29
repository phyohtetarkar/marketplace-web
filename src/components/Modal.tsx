import { ReactNode, useEffect, useRef, useState } from "react";

interface ModalProps {
  id?: string;
  show?: boolean;
  variant?: "default" | "full" | "large";
  onHidden?: () => void;
  children?: (isShown: boolean) => ReactNode;
}

function Modal({
  id,
  show,
  variant = "default",
  onHidden,
  children
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalInstance = useRef<any>();
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let element: HTMLDivElement | null;

    const handleShown = (event: Event) => {
      setIsShown(true);
    };

    const handleHidden = (event: Event) => {
      setIsShown(false);
      onHidden?.();
    };

    const initModal = async () => {
      const Modal = (await import("bootstrap")).Modal;
      element = modalRef.current;
      if (!element) {
        return;
      }

      modalInstance.current = Modal.getOrCreateInstance(element, {
        keyboard: false,
        backdrop: "static"
      });

      element.addEventListener("show.bs.modal", handleShown);

      element.addEventListener("hidden.bs.modal", handleHidden);
    };

    initModal();

    return () => {
      element?.removeEventListener("show.bs.modal", handleShown);
      element?.removeEventListener("hidden.bs.modal", handleHidden);
      modalInstance.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (show) {
      modalInstance.current?.show();
    } else {
      modalInstance.current?.hide();
    }
  }, [show]);

  let size = "";

  switch (variant) {
    case "full":
      size = "modal-fullscreen";
      break;
    case "large":
      size = "modal-lg";
      break;
  }

  return (
    <div
      id={id}
      ref={modalRef}
      className="modal fade"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-dialog-scrollable ${size}`}>
        <div className="modal-content">{children && children(isShown)}</div>
      </div>
    </div>
  );
}

export default Modal;
