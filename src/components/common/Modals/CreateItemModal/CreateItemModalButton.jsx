import { useState, useContext } from "react"
import ItemModal from "./ItemModal"
import { add_item } from "../../../../api/worlds"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"

export default function CreateItemModalButton() {
  const [show, setShow] = useState(false)
  const { setWorldDetails, worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const [ alertMessage, setAlertMessage ] = useState("")

  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  const handleSubmit = (e, formData, selectedCharacters) => {
    e.preventDefault()
    const payload = {...formData, characters: selectedCharacters}
    add_item(token, worldDetails.world_id, payload)
      .then(response => {
        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }

          const newItem = {
            item_id: data.item_id,
            item_name: formData.name,
            item_description: formData.description
          }

          const newItems = [...worldDetails.items, newItem]

          setWorldDetails({
            ...worldDetails,
            items: newItems
          })
          setAlertMessage("")
          handleClose(true)
        })
      }).catch(err => {
        setAlertMessage(err.message)
      })
  }



  return (
    <>
      <span className="fakeLink" onClick={handleShow}>
                Add
      </span>
      <ItemModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} alertMessage={alertMessage} />
    </>
  )
}