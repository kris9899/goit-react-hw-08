import React from 'react';
import styles from './Modal.module.css';

export default function Modal({ onClose, onConfirm, contact }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalText}>
          Are you sure you want to delete {contact.name} ?
        </h2>
        <div>
          <button onClick={onConfirm} className={styles.confirmBtn}>
            Yes
          </button>
          <button onClick={onClose} className={styles.cancelBtn}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
