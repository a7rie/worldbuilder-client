import { useState, useContext } from "react"
import GroupModal from "./GroupModal"
import { add_group } from "../../../../api/worlds"
import { UserContext } from "../../../../contexts/UserContext"
import { WorldsContext } from "../../../../contexts/WorldsContext"

export default function CreateGroupModalButton() {
  const [show, setShow] = useState(false)

  const { user } = useContext(UserContext)
  const token = user.token

  const { worldDetails, setWorldDetails } = useContext(WorldsContext)

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
    add_group(token, worldDetails.world_id, payload)
      .then(response => {
        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }

          const newGroup = {
            group_id: data.group_id,
            group_name: formData.name,
            group_description: formData.description
          }

          const newGroups = [...worldDetails.groups, newGroup]

          setWorldDetails({
            ...worldDetails,
            groups: newGroups
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
      <GroupModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} alertMessage={alertMessage} />
    </>
  )
}