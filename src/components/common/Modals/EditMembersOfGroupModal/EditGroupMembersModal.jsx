import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import RedAlert from "../../RedAlert"
import { useState } from "react"
import EditGroupMembersForm from "./EditGroupMembersForm"

export default function EditGroupMembersModal({ show, handleClose, groupDetails, setGroupDetails }) {

  const [ alertMessage, setAlertMessage ] = useState("")
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Members of Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RedAlert alertMessage={alertMessage} />
        <EditGroupMembersForm setAlertMessage={setAlertMessage} handleClose={handleClose} groupDetails={groupDetails}
          setGroupDetails={setGroupDetails}
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