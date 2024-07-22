import { useContext, useEffect, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { UserContext } from "../../../contexts/UserContext"
import { event_overview } from "../../../api/worlds"
import CharactersTable from "../../common/Tables/CharactersTable"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import EditParticipatingCharactersModalButton from "../../common/Modals/EditParticipatingCharactersModal/EditParticipatingCharactersModalButton"
import EditEventModalButton from "../../common/Modals/CreateEventModal/EditEventModalButton"


export default function EventView() {
  const { selectedEventId, worldDetails, setSelectedLocationId } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const worldId = worldDetails.world_id

  const [eventDetails, setEventDetails] = useState({})
  const [eventUpdated, setEventUpdated] = useState(0)

  useEffect(() => {
    if (!selectedEventId) {
      return
    }
    event_overview(token, worldId, selectedEventId)
      .then(response => {
        if (!response.ok) {
          console.error("Unable to retrieve event details")
          return
        }
        response.json().then(data => {
          setEventDetails(data)
        })
      }).catch(err => {
        console.error(err.message)
      })

  }, [selectedEventId, token, worldId, eventUpdated])

  if (Object.keys(eventDetails).length === 0) {
    return <div>Loading...</div>
  }

  const location = eventDetails.location
  let locationPath = null
  if (location) locationPath = `/${user.username}/worlds/${worldId}/locations`


  return (
    <Container fluid>
      <Row>
        <Col md={1}></Col>
        <Col md={10}>

          <Row className="mb-3">
            <Col md={12} className="text-center">
              <Link to={`/${user.username}/worlds`}>Go to {worldDetails.world_name}</Link>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12} className="text-center">
              <h1>{eventDetails.event_name}</h1>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12} className="text-center">
              <EditEventModalButton eventDetails={eventDetails} setEventDetails={setEventDetails} setEventUpdated={setEventUpdated} />
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={12}>
              <b>Description: </b> {eventDetails.event_description}
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={3}>
              <b>Type: </b> {eventDetails.event_type}
            </Col>
            <Col md={3}>
              <b>Date: </b> {eventDetails.event_date}
            </Col>
            <Col md={3}>
              <b>Location: </b> {
                location
                  ? <Link onClick={() => setSelectedLocationId(location.location_id)} to={locationPath}>{location.location_name}</Link>
                  : null
              }
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <b>Participating Characters</b> <EditParticipatingCharactersModalButton eventDetails={eventDetails} setEventDetails={setEventDetails} />
              <CharactersTable characters={eventDetails.characters} />
            </Col>
            <Col md={6}>

            </Col>
          </Row>
        </Col>
      </Row>
      <Col md={1}></Col>
    </Container>
  )
}