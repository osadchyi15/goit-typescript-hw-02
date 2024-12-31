import {
  useEffect,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  FC,
} from "react";
import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { ImageModalProps } from "../../types";

Modal.setAppElement("#root");

const ImageModal: FC<ImageModalProps> = ({
  imageInfo,
  isModalOpen,
  onCloseModal,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  return (
    <Modal
      className={css.Modal}
      overlayClassName={css.Overlay}
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      preventScroll={true}
    >
      <img
        src={imageInfo.fullUrl}
        alt={imageInfo.alt}
        className={css.imageModal}
      />
      <button
        type="button"
        className={css.closeModalBtn}
        onClick={onCloseModal}
      >
        &times;
      </button>
    </Modal>
  );
};

export default ImageModal;
