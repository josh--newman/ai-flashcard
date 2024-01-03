import { ReactNode } from "react";

import styles from "./FormModal.module.css";

interface Props {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

const FormModal = ({ onClose, show, children }: Props) => {
  return (
    <div
      className={`${styles.modal} ${
        show ? styles.showModal : styles.hideModal
      }`}
    >
      <section className={styles.modalMain}>
        {children}
        <div className={styles.buttonContainer}>
          <button onClick={onClose}>close</button>
        </div>
      </section>
    </div>
  );
};

export default FormModal;
