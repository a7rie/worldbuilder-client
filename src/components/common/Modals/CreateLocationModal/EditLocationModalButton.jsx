import { useState, useContext } from "react"
import LocationModal from "./LocationModal"
import { edit_location } from "../../../../api/worlds"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"

export default function EditLocationModalButton({ locationDetails, setLocationUpdated }) {

  const { worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const [alertMessage, setAlertMessage] = useState("")

  const [show, setShow] = useState(false)

  function handleShow() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  const handleSubmit = (e, formData) => {
    e.preventDefault()
    edit_location(token, worldDetails.world_id, locationDetails.location_id, formData)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            setAlertMessage(data.error)
          })
          return
        }
        setLocationUpdated(i => !i)
        setAlertMessage("")
        handleClose(true)
      }).catch(err => {
        setAlertMessage(err.message)
      })
  }

  const prefilledFields = { ...locationDetails }

  return (
    <>
      <span className="fakeLink" onClick={handleShow}>
        Edit
      </span>
      <LocationModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} alertMessage={alertMessage}
        prefilledFields={prefilledFields} edit />
    </>
  )
}