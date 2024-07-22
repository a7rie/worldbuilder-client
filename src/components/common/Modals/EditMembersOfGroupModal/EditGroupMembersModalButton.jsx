import { useState } from "react"
import EditGroupMembersModal from "./EditGroupMembersModal"

export default function EditGroupMembersModalButton({ groupDetails, setGroupDetails }) {
  const [show, setShow] = useState(false)

  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  return (
    <>
      <span className="fakeLink" onClick={handleShow}>
        Edit
      </span>
      <EditGroupMembersModal show={show} handleClose={handleClose} groupDetails={groupDetails} setGroupDetails={setGroupDetails} />
    </>
  )
}