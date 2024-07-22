import { useState } from "react"
import EditItemsOwnedModal from "./EditItemsOwnedModal"

export default function EditItemsOwnedModalButton({ itemsOwned, characterDetails, setCharacterDetails }) {
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
      <EditItemsOwnedModal show={show} handleClose={handleClose} itemsOwned={itemsOwned} characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
    </>
  )
}