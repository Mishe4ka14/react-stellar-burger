import React, {useEffect} from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

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
     <>
      <ModalOverlay closeModal={handleClose}/>
      <div className={styles.container}>
        <div className={styles.close}><CloseIcon onClick={handleClose}/></div>
        {children}
      </div>
    </>
  ), modalRoot)
  }

  Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};
export default Modal