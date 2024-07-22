import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { useContext } from "react"
import SelectFromList from "../SelectFromList"
import { update_char_events } from "../../../../api/worlds"

export default function EditEventsParticipatedForm({ setAlertMessage, handleClose, characterDetails, setCharacterDetails }) {

  const { user } = useContext(UserContext)
  const token = user.token

  const { worldDetails, selectedCharacterId } = useContext(WorldsContext)
  const worldId = worldDetails.world_id

  const eventsParticipated = characterDetails.events.map(event => event.event_id)
  const [selectedEvents, setSelectedEvents] = useState(eventsParticipated)

  const allEvents = worldDetails.events
  // format in way such that it can be passed to SelectFromList component, which can accept any type of entity
  const formattedEvents = allEvents.map(event => (
    {
      id: event.event_id,
      name: event.event_name
    }
  ))

  const handleSubmit = (e) => {
    e.preventDefault()
    update_char_events(token, worldId, selectedCharacterId, selectedEvents)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            if (!response.ok) {
              setAlertMessage(data.error)
              return
            }
          })
        }

        let newEventsForCharacter = worldDetails.events.filter(event => selectedEvents.includes(event.event_id))
        newEventsForCharacter = newEventsForCharacter.map(event => ({
          event_id: event.event_id,
          event_name: event.event_name,
          event_type: event.event_type,
        }))

        setCharacterDetails({
          ...characterDetails,
          events: newEventsForCharacter
        })

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

        <SelectFromList entities={formattedEvents}
          setSelectedEntities={setSelectedEvents}
          selectedEntities={selectedEvents}
        />
        <Button type="submit" disabled={selectedEvents === eventsParticipated}>
          Update
        </Button>
      </Form>
    </Container >
  )
}