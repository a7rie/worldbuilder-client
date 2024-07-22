import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import RedAlert from "../../RedAlert"
import { useState } from "react"
import EditItemsOwnerForm from "./EditItemOwnersForm"

export default function EditItemOwnersModal({ show, handleClose, itemDetails, setItemDetails }) {

  const [ alertMessage, setAlertMessage ] = useState("")
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Owners of Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <EditItemsOwnerForm setAlertMessage={setAlertMessage} handleClose={handleClose}
          itemDetails={itemDetails} setItemDetails={setItemDetails}
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