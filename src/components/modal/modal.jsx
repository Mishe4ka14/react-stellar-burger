import React, {useEffect} from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/actions/modal';

const modalRoot = document.getElementById('modal-root')

const Modal = ({children}) => {

  const dispatch = useDispatch();

  const escClose = (e) => {
    if (e.key === "Escape") {
      dispatch(closeModal())
      }
    }

    useEffect(() => {
      document.addEventListener('keydown', escClose);
      return () => {
          document.removeEventListener('keydown', escClose)
      }
  })

  return ReactDOM.createPortal( (
     <>
      <ModalOverlay closeModal={(() => dispatch(closeModal()))}/>
      <div className={styles.container}>
        <div className={styles.close}><CloseIcon onClick={(() => dispatch(closeModal()))}/></div>
        {children}
      </div>
    </>
  ), modalRoot)
  }

  Modal.propTypes = {
    children: PropTypes.node.isRequired
};
export default Modal