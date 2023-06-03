import React, {useEffect, useState} from 'react'
import styles from './modal-overlay.module.css'
import Modal from '../modal/modal';

const ModalOverlay = ({closeModal}) => {

  return (
    <div className={styles.overlay} onClick={closeModal}>
    </div>
  
  
)}

export default ModalOverlay