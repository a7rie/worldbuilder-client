import { useState, useContext } from "react"
import GroupModal from "./GroupModal"
import { edit_group } from "../../../../api/worlds"
import { UserContext } from "../../../../contexts/UserContext"
import { WorldsContext } from "../../../../contexts/WorldsContext"

export default function EditGroupModalButton({ groupDetails, setGroupUpdated }) {
  const [show, setShow] = useState(false)

  const { user } = useContext(UserContext)
  const token = user.token

  const { worldDetails } = useContext(WorldsContext)

  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }
  const [ alertMessage, setAlertMessage ] = useState("")

  const handleSubmit = (e, formData, selectedCharacters) => {
    e.preventDefault()
    const payload = { ...formData, characters: selectedCharacters }
    edit_group(token, worldDetails.world_id, groupDetails.group_id, payload)
      .then(response => {
        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }
          setGroupUpdated(i => !i)
          setAlertMessage("")
          handleClose(true)
        })
      }).catch(err => {
        setAlertMessage(err.message)
      })
  }
  const prefilledFields = {...groupDetails}

  return (
    <>
      <span className="fakeLink" onClick={handleShow}>
                Edit
      </span>
      <GroupModal show={show} handleClose={handleClose} handleSubmit={handleSubmit}
        alertMessage={alertMessage} prefilledFields={prefilledFields} edit />
    </>
  )
}