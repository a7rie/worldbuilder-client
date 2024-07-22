import { useState, useContext } from "react"
import CharacterModal from "./CharacterModal"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { add_character } from "../../../../api/worlds"

export default function CreateCharacterModalButton() {
  const { setWorldDetails, worldDetails } = useContext(WorldsContext)
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
    add_character(token, worldDetails.world_id, formData)
      .then(response => {

        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }

          const newChar = {
            char_id: data.char_id,
            char_name: formData.name,
            char_description: formData.description,
            char_morality: formData.morality
          }
          const newChars = [...worldDetails.characters, newChar]
          setWorldDetails({
            ...worldDetails,
            characters: newChars
          })
          handleClose(true)
          setAlertMessage("")
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
      <CharacterModal show={show} handleClose={handleClose} handleSubmit={handleSubmit}
        alertMessage={alertMessage} setAlertMessage={setAlertMessage}
      />
    </>
  )
}