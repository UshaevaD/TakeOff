import s from "./styles/popup.module.css";
import { CloseButton, Modal, ModalTitle } from "react-bootstrap";

export interface PopupProps  { 
    children: React.ReactNode
    showModal: boolean
    handleClose: (toggle: boolean) => void
    title: string
}

const ModalPopup: React.FC<PopupProps> = ({ children, showModal, handleClose, title }) => {
    return (
        <Modal 
            show={showModal} 
            onHide={() => handleClose(false)} 
            dialogClassName={s.popup} 
            centered
        >
            <Modal.Header>
                <ModalTitle>{title}</ModalTitle>
                <CloseButton className={s.popupCloseBtn} onClick={() => handleClose(false)} />
            </Modal.Header>

            {children}
        </Modal>
    )
}

export default ModalPopup