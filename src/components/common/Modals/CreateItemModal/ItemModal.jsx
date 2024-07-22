import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ItemForm from "./ItemForm"
import RedAlert from "../../RedAlert"

export default function ItemModal({ show, handleClose, handleSubmit, alertMessage, edit, prefilledFields }) {

  if (!prefilledFields) prefilledFields = {}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <ItemForm handleSubmit={handleSubmit} edit={edit} prefilledFields={prefilledFields} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
                    Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}