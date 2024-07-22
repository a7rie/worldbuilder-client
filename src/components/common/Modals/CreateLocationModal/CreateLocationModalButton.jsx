import { useState, useContext } from "react"
import LocationModal from "./LocationModal"
import { add_location } from "../../../../api/worlds"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"

export default function CreateLocationModalButton() {

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
    add_location(token, worldDetails.world_id, formData)
      .then(response => {
        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }

          const newLocation = {
            location_id: data.location_id,
            location_name: formData.name,
            location_description: formData.description,
            location_population: formData.population
          }

          const newLocations = [...worldDetails.locations, newLocation]

          setWorldDetails({
            ...worldDetails,
            locations: newLocations
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
      <LocationModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} alertMessage={alertMessage}/>
    </>
  )
}