import { useState } from "react"
import CreateWorldModal from "./CreateWorldModal"

export default function CreateCharacterModalButton() {
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
        Create New World
      </span>
      <CreateWorldModal show={show} handleClose={handleClose} />
    </>
  )
}