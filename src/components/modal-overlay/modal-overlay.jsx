import React, {useEffect, useState} from 'react'
import styles from './modal-overlay.module.css'
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

const ModalOverlay = ({closeModal}) => {

  return (
    <div className={styles.overlay} onClick={closeModal}>
    </div>
)}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
}
export default ModalOverlay