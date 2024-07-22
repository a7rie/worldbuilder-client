import { useState } from "react"
import EditGroupsApartOfModal from "./EditGroupsApartOfModal"

export default function EditGroupsApartOfModalButton({ groupsApartOf, characterDetails, setCharacterDetails }) {
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
      <EditGroupsApartOfModal show={show} handleClose={handleClose} groupsApartOf={groupsApartOf} characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
    </>
  )
}