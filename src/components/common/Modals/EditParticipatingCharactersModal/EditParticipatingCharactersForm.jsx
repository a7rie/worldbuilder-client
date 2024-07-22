import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { useContext } from "react"
import SelectFromList from "../SelectFromList"
import { update_event_chars } from "../../../../api/worlds"

export default function EditParticipatingCharactersForm({ setAlertMessage, handleClose, eventDetails, setEventDetails }) {

  const { user } = useContext(UserContext)
  const token = user.token

  const { worldDetails, selectedEventId } = useContext(WorldsContext)
  const worldId = worldDetails.world_id
  const characters = worldDetails.characters

  let participatingCharacters = eventDetails.characters.map(c => c.char_id)

  const [selectedCharacters, setSelectedCharacters] = useState(participatingCharacters)

  // format in way such that it can be passed to SelectFromList component, which can accept any type of entity
  const formattedCharacters = characters.map(char => (
    {
      id: char.char_id,
      name: char.char_name
    }
  ))


  const handleSubmit = (e) => {
    e.preventDefault()
    update_event_chars(token, worldId, selectedEventId, selectedCharacters)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            if (!response.ok) {
              setAlertMessage(data.error)
              return
            }
          }).catch(
            setAlertMessage("Could not update participating characters, got status code: " + response.status)
          )
          return
        }

        let newCharactersForEvent = worldDetails.characters.filter(char => selectedCharacters.includes(char.char_id))
        newCharactersForEvent = newCharactersForEvent.map(char => ({
          char_id: char.char_id,
          char_name: char.char_name,
        }))

        setEventDetails({
          ...eventDetails,
          characters: newCharactersForEvent
        }
        )

        handleClose(true)

      }).catch(err => {
        setAlertMessage(err.message)
      })
  }

  /**
   * TODO: more robust check on button being disabled
   */
  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>

        <SelectFromList entities={formattedCharacters}
          setSelectedEntities={setSelectedCharacters}
          selectedEntities={selectedCharacters}
        />
        <Button type="submit" disabled={selectedCharacters === participatingCharacters}>
          Update
        </Button>
      </Form>
    </Container >
  )
}