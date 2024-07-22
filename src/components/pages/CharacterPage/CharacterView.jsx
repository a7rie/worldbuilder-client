import { useContext, useEffect, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { UserContext } from "../../../contexts/UserContext"
import { character_overview } from "../../../api/worlds"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import EventsTable from "../../common/Tables/EventsTable"
import RelationshipsTable from "../../common/Tables/RelationshipsTable"
import ItemsTable from "../../common/Tables/ItemsTable"
import GroupsTable from "../../common/Tables/GroupsTable"
import EditItemsOwnedModalButton from "../../common/Modals/EditItemsOwnedModal/EditItemsOwnedModalButton"
import EditGroupsApartOfModalButton from "../../common/Modals/EditGroupsApartOfModal/EditGroupsApartOfModalButton"
import CreateRelationshipModalButton from "../../common/Modals/CreateRelationshipModal/CreateRelationshipModalButton.jsx"
import EditEventsParticipatedModalButton from "../../common/Modals/EditEventsParticipatedMOdal/EditEventsParticipatedModalButton.jsx"
import EditCharacterModalButton from "../../common/Modals/CreateCharacterModal/EditCharacterModalButton.jsx"

export default function CharacterView() {
  const { selectedCharacterId, worldDetails, setSelectedLocationId } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const worldId = worldDetails.world_id
  const [characterDetails, setCharacterDetails] = useState({})
  const [characterUpdated, setCharacterUpdated] = useState(0)

  useEffect(() => {
    if (!selectedCharacterId) {
      return
    }
    character_overview(token, worldId, selectedCharacterId)
      .then(response => {
        if (!response.ok) {
          console.error("Unable to retrieve character details")
          return
        }
        response.json().then(data => {
          setCharacterDetails(data)
        })
      }).catch(err => {
        console.error(err.message)
      })

  }, [selectedCharacterId, token, worldId, characterUpdated])

  if (Object.keys(characterDetails).length === 0) {
    return <div>Loading...</div>
  }

  const location = characterDetails.location
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
              <h1>{characterDetails.char_name}</h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12} className="text-center">
              <EditCharacterModalButton characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} setCharacterUpdated={setCharacterUpdated} />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={12}>
              <b>Description: </b> {characterDetails.char_description}
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={12}>
              <b>Backstory: </b> {characterDetails.char_backstory}
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={12}>
              <b>Appearance: </b> {characterDetails.char_appearance}
            </Col>
          </Row>
          <Row className="mb-5">

            <Col md={3}>
              <b>Location: </b> {
                location
                  ? <Link onClick={() => setSelectedLocationId(location.location_id)} to={locationPath}>{location.location_name}</Link>
                  : null
              }
            </Col>
            <Col md={3}>
              <b>Birth: </b> {characterDetails.char_birth_date}
            </Col>
            <Col md={3}>
              <b>Death: </b> {characterDetails.char_death_date}
            </Col>
            <Col md={3}>
              <b>Morality: </b> {characterDetails.char_morality}
            </Col>

          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <b>Items Owned</b> <EditItemsOwnedModalButton itemsOwned={characterDetails.items} characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
              <ItemsTable items={characterDetails.items} />
              <b>Events Participated In</b> <EditEventsParticipatedModalButton characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
              <EventsTable events={characterDetails.events} />
              <b>Groups Apart of</b> <EditGroupsApartOfModalButton groupsApartOf={characterDetails.groups} characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
              <GroupsTable groups={characterDetails.groups} />
              <b>Relationships</b> <CreateRelationshipModalButton characterDetails={characterDetails} setCharacterDetails={setCharacterDetails} />
              <RelationshipsTable relationships={characterDetails.relationships} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Col md={1}></Col>
    </Container>
  )
}