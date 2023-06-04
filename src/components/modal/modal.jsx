import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderModal from '../order-details/order-details';

const modalRoot = document.getElementById('modal-root')

const Modal = ({handleClose, children}) => {

  const escClose = (e) => {
    (e.key === 'Escape' && handleClose())
  }
    useEffect(() => {
      document.addEventListener('keydown', escClose);
      return () => {
          document.removeEventListener('keydown', escClose)
      }
  })

  return ReactDOM.createPortal( (
     <div>
      <ModalOverlay closeModal={handleClose}/>
      <div className={styles.container}>
        <div className={styles.close}><CloseIcon onClick={handleClose}/></div>
        {children}
      </div>
    </div>
  ), modalRoot)
  }
export default Modal