import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import EventForm from "./EventForm"
import RedAlert from "../../RedAlert"

export default function EventModal({ show, handleClose, handleSubmit, prefilledFields, edit, alertMessage }) {
  if (!prefilledFields) prefilledFields = {}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Edit Event" : "Create Event"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <EventForm
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          prefilledFields={prefilledFields}
          edit={edit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
                    Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}