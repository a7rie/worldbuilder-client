import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import RedAlert from "../../RedAlert"
import { useState } from "react"
import EditParticipatingCharactersForm from "./EditParticipatingCharactersForm"

export default function EditParticipatingCharactersModal({ show, handleClose, eventDetails, setEventDetails }) {
  const [ alertMessage, setAlertMessage ] = useState("")
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Characters Participating in this Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <EditParticipatingCharactersForm setAlertMessage={setAlertMessage} handleClose={handleClose} eventDetails={eventDetails}
          setEventDetails={setEventDetails}
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