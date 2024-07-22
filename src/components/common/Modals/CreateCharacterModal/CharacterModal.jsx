import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import CharacterForm from "./CharacterForm"
import RedAlert from "../../RedAlert"

export default function CharacterModal({ show, handleClose, handleSubmit, prefilledFields, alertMessage, setAlertMessage, edit }) {
  if (!prefilledFields) prefilledFields = {}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Edit" : "Create"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <CharacterForm setAlertMessage={setAlertMessage} handleClose={handleClose} handleSubmit={handleSubmit}
          prefilledFields={prefilledFields} edit={edit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
                    Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}