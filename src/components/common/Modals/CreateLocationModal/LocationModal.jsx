import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import LocationForm from "./LocationForm"
import RedAlert from "../../RedAlert"

export default function LocationModal({ show, handleSubmit, handleClose, alertMessage, prefilledFields, edit }) {
  if (!prefilledFields) prefilledFields = {}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Edit Location" : "Create Location" }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <LocationForm handleSubmit={handleSubmit} handleClose={handleClose} prefilledFields={prefilledFields} edit={edit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
                    Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}