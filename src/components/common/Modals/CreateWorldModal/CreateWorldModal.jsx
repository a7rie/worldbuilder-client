import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import CreateWorldForm from "./CreateWorldForm"
import RedAlert from "../../RedAlert"
import { useState } from "react"

export default function CreateWorldModal({ show, handleClose }) {

  const [ alertMessage, setAlertMessage ] = useState("")

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create world</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <CreateWorldForm setAlertMessage={setAlertMessage} handleClose={handleClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
                    Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}