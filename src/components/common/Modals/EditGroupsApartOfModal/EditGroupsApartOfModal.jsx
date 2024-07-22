import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import RedAlert from "../../RedAlert"
import { useState } from "react"
import EditGroupsApartOfForm from "./EditGroupsApartOfForm"

export default function EditGroupsApartOfModal({ show, handleClose, groupsApartOf, characterDetails, setCharacterDetails }) {

  const [ alertMessage, setAlertMessage ] = useState("")
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Groups for Character</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <EditGroupsApartOfForm setAlertMessage={setAlertMessage} handleClose={handleClose} groupsApartOf={groupsApartOf} characterDetails={characterDetails}
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