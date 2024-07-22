import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import RedAlert from "../../RedAlert"
import { useState } from "react"
import EditItemsOwnedForm from "./EditItemsOwnedForm"

export default function EditItemsOwnedModal({ show, handleClose, itemsOwned, characterDetails, setCharacterDetails }) {

  const [ alertMessage, setAlertMessage ] = useState("")
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item Ownership</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <EditItemsOwnedForm setAlertMessage={setAlertMessage} handleClose={handleClose} itemsOwned={itemsOwned} characterDetails={characterDetails}
          setCharacterDetails={setCharacterDetails}
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