import { useContext, useState } from "react"
import CreateEventModal from "./EventModal"
import { add_event } from "../../../../api/worlds"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"

export default function CreateEventModalButton() {
  const { user } = useContext(UserContext)
  const { worldDetails, setWorldDetails } = useContext(WorldsContext)
  const token = user.token

  const [show, setShow] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  const handleSubmit = (e, formData, selectedCharacters) => {
    e.preventDefault()
    const payload = { ...formData, characters: selectedCharacters }
    add_event(token, worldDetails.world_id, payload)
      .then(response => {
        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }

          let location_name = null
          if (formData.location_id) {
            const location = worldDetails.locations.find((l) => l.location_id === formData.location_id)
            location_name = location ? location.location_name : null
          }

          const newEvent = {
            event_id: data.event_id,
            location_name: location_name,
            event_name: formData.name,
            event_description: formData.description,
            event_type: formData.event_type,
            event_date: formData.date
          }

          const newEvents = [...worldDetails.events, newEvent]

          setWorldDetails({
            ...worldDetails,
            events: newEvents
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
      <CreateEventModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} alertMessage={alertMessage} />
    </>
  )
}