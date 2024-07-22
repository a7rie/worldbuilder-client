import { useContext, useState } from "react"
import CreateEventModal from "./EventModal"
import { edit_event } from "../../../../api/worlds"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"

export default function EditEventModalButton({ eventDetails, setEventUpdated }) {
  const { user } = useContext(UserContext)
  const { worldDetails } = useContext(WorldsContext)
  const token = user.token

  const [show, setShow] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  const handleSubmit = (e, formData) => {
    e.preventDefault()
    console.log(formData)
    edit_event(token, worldDetails.world_id, eventDetails.event_id, formData)
      .then(response => {
        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }
          setEventUpdated(i => i + 1)
          setAlertMessage("")
          handleClose(true)
        })
      }).catch(err => {
        setAlertMessage(err.message)
      })
  }
  const prefilledFields = {...eventDetails}
  return (
    <>
      <span className="fakeLink" onClick={handleShow}>
                Edit
      </span>
      <CreateEventModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} alertMessage={alertMessage}
        prefilledFields={prefilledFields} edit />
    </>
  )
}