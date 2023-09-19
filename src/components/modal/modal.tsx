import {useEffect} from 'react'
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/actions/modal';
import { TModal } from '../../services/types/types';

const modalRoot = document.getElementById('modal-root')

const Modal = ({children, onClose}: TModal): JSX.Element => {

  const dispatch = useDispatch();

const handlerClose = () => {
  dispatch(closeModal())
  if (typeof onClose === 'function') {
    onClose();
  }
}

  const escClose = (e: Event & { key: string }) => {
    if (e.key === "Escape") {
        handlerClose()
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
      <ModalOverlay closeModal={(() => handlerClose())}/>
      <div className={styles.container}>
        <div className={styles.close}><CloseIcon type='primary' onClick={(() => handlerClose())}/></div>
        {children}
      </div>
    </>
  ), modalRoot as HTMLElement)
  }

  Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
};
export default Modal