import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import GroupForm from "./GroupForm"
import RedAlert from "../../RedAlert"

export default function GroupModal({ show, handleClose, handleSubmit, alertMessage, edit, prefilledFields }) {
  if (!prefilledFields) prefilledFields = {}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Edit Group" : "Create Group"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <GroupForm  handleClose={handleClose} edit={edit} prefilledFields={prefilledFields} handleSubmit={handleSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
                    Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}