import { useState } from "react"
import EditEventsParticipatedModal from "./EditEventsParticipatedModal"

export default function EditEventsParticipatedModalButton({ characterDetails, setCharacterDetails }) {
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
      <EditEventsParticipatedModal show={show} handleClose={handleClose} characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
    </>
  )
}