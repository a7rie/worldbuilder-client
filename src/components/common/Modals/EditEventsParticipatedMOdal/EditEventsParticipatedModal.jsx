import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import RedAlert from "../../RedAlert"
import { useState } from "react"
import EditEventsParticipatedForm from "./EditEventsParticipatedForm"

export default function EditEventsParticipatedModal({ show, handleClose, characterDetails, setCharacterDetails }) {

  const [ alertMessage, setAlertMessage ] = useState("")
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Events Character Participated In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <EditEventsParticipatedForm setAlertMessage={setAlertMessage} handleClose={handleClose} characterDetails={characterDetails}
          setCharacterDetails={setCharacterDetails} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
                    Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}