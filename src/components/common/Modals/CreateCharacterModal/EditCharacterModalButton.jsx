import { useState, useContext } from "react"
import CharacterModal from "./CharacterModal"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { edit_character } from "../../../../api/worlds"

export default function EditCharacterModalButton({ characterDetails, setCharacterUpdated }) {

  const { worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const [ alertMessage, setAlertMessage ] = useState("")

  const [show, setShow] = useState(false)

  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  const handleSubmit = (e, formData) => {
    e.preventDefault()
    formData.location_id ? formData.location_id = Number(formData.location_id) : formData.location_id = null
    edit_character(token, worldDetails.world_id, characterDetails.char_id, formData)
      .then(response => {

        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }

          handleClose(true)
          setAlertMessage("")
          setCharacterUpdated(i => i + 1)
        })

      }).catch(err => {
        setAlertMessage(err.message)
      })
  }

  const prefilledFields = {...characterDetails}


  return (
    <>
      <span className="fakeLink" onClick={handleShow}>
                Edit
      </span>
      <CharacterModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} prefilledFields={prefilledFields}
        alertMessage={alertMessage} setAlertMessage={setAlertMessage} edit
      />
    </>
  )
}