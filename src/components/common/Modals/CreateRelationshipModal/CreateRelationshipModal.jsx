import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import RedAlert from "../../RedAlert"
import { useState } from "react"
import CreateRelationshipForm from "./CreateRelationshipForm"

export default function CreateRelationshipModal({ show, handleClose, characterDetails, setCharacterDetails }) {

  const [alertMessage, setAlertMessage] = useState("")

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Relationship</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <CreateRelationshipForm setAlertMessage={setAlertMessage} handleClose={handleClose} characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}