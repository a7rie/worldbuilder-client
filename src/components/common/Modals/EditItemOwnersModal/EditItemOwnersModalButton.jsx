import { useState } from "react"
import EditItemOwnersModal from "./EditItemOwnersModal"

export default function EditItemOwnersModalButton({ itemDetails, setItemDetails }) {
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
      <EditItemOwnersModal show={show} handleClose={handleClose} itemDetails={itemDetails} setItemDetails={setItemDetails} />
    </>
  )
}