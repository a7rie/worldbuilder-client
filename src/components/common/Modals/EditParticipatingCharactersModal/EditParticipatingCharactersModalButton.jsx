import { useState } from "react"
import EditParticipatingCharactersModal from "./EditParticipatingCharactersModal"

export default function EditParticipatingCharactersModalButton({ eventDetails, setEventDetails }) {
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
      <EditParticipatingCharactersModal show={show} handleClose={handleClose} eventDetails={eventDetails} setEventDetails={setEventDetails} />
    </>
  )
}