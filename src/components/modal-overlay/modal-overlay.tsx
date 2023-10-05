import { closeModal } from '../../services/actions/modal';
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = ({closeModal}:{closeModal():void}) => {

  return (
    <div className={styles.overlay} onClick={closeModal}>
    </div>
)}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
}
export default ModalOverlay