import { useContext, useEffect, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { UserContext } from "../../../contexts/UserContext"
import { location_overview } from "../../../api/worlds"
import CharactersTable from "../../common/Tables/CharactersTable"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import EventsTable from "../../common/Tables/EventsTable"
import EditLocationModalButton from "../../common/Modals/CreateLocationModal/EditLocationModalButton"


export default function LocationView() {
  const { selectedLocationId, worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const worldId = worldDetails.world_id

  const [locationDetails, setLocationDetails] = useState({})
  const [locationUpdated, setLocationUpdated] = useState(false)

  useEffect(() => {
    if (!selectedLocationId) {
      return
    }

    location_overview(token, worldId, selectedLocationId)
      .then(response => {
        if (!response.ok) {
          console.error("Unable to retrieve location details")
          return
        }
        response.json().then(data => {
          setLocationDetails(data)
        })
      }).catch(err => {
        console.error(err.message)
      })

  }, [selectedLocationId, token, worldId, locationUpdated])

  if (Object.keys(locationDetails).length === 0) {
    return <div>Loading...</div>
  }

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
              <h1>{locationDetails.location_name}</h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12} className="text-center">
              <EditLocationModalButton locationDetails={locationDetails} setLocationUpdated={setLocationUpdated} />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={12}>
              <b>Description: </b> {locationDetails.location_description}
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={6}>
              <b>Type: </b> {locationDetails.location_type}
            </Col>
            <Col md={6}>
              <b>Population: </b> {locationDetails.location_population}
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={6}>
              <b>Characters in {locationDetails.location_name}</b> <CharactersTable characters={locationDetails.characters}/>
            </Col>
            <Col md={6}>
              <b>Events that happened in {locationDetails.location_name} </b>
              <EventsTable events={locationDetails.events} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Col md={1}></Col>
    </Container>
  )
}