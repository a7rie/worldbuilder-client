import { useState, useContext } from "react"
import ItemModal from "./ItemModal"
import { edit_item } from "../../../../api/worlds"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"

export default function EditItemModalButton({ itemDetails, setItemUpdated }) {
  const [show, setShow] = useState(false)
  const { worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const [alertMessage, setAlertMessage] = useState("")

  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  // eslint-disable-next-line
  const handleSubmit = (e, formData, selectedCharacters) => {
    e.preventDefault()
    edit_item(token, worldDetails.world_id, itemDetails.item_id, formData)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            setAlertMessage(data.error)
            return
          }
          )
        }
        setItemUpdated(i => !i)
        setAlertMessage("")
        handleClose(true)
      })
      .catch(err => {
        setAlertMessage(err.message)
      })
  }


  return (
    <>
      <span className="fakeLink" onClick={handleShow}>
        Edit
      </span>
      <ItemModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} alertMessage={alertMessage}
        prefilledFields={itemDetails} edit />
    </>
  )
}