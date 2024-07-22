import { useState } from "react"
import CreateRelationshipModal from "./CreateRelationshipModal"

export default function CreateRelationshipModalButton({ characterDetails, setCharacterDetails }) {
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
        Add
      </span>
      <CreateRelationshipModal show={show} handleClose={handleClose} characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
    </>
  )
}