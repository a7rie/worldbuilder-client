import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import CharacterTable from "./CharacterTable"
import LocationTable from "./LocationTable"
import GroupTable from "./GroupTable"
import EventTable from "./EventTable"
import ItemTable from "./ItemTable"
import { useContext } from "react"
import { WorldsContext } from "../../../../../contexts/WorldsContext"
import CreateCharacterModalButton from "../../../../common/Modals/CreateCharacterModal/CreateCharacterModalButton"
import CreateEventModalButton from "../../../../common/Modals/CreateEventModal/CreateEventModalButton"
import CreateGroupModalButton from "../../../../common/Modals/CreateGroupModal/CreateGroupModalButton"
import CreateItemModalButton from "../../../../common/Modals/CreateItemModal/CreateItemModalButton"
import CreateLocationModalButton from "../../../../common/Modals/CreateLocationModal/CreateLocationModalButton"

export default function WorldOverview() {
  const { worldDetails } = useContext(WorldsContext)
  return (
    <div>
      <Row className="mb-3">
        <Col className="text-center" md={12}>
          {worldDetails.world_description}
        </Col>
      </Row>
      {/* <Row className="mb-3">
                <Col >
                    <Timeline />
                </Col>
            </Row> */}
      <Row>
        <Col md={6}>
          <b>Characters</b> <CreateCharacterModalButton />
          <CharacterTable />
          <b>Items</b> <CreateItemModalButton />
          <ItemTable />
          <b>Groups</b> <CreateGroupModalButton />
          <GroupTable />
        </Col>
        <Col md={6}>
          <b>Events</b> <CreateEventModalButton />
          <EventTable />
          <b>Locations</b> <CreateLocationModalButton />
          <LocationTable />
        </Col>
      </Row>
    </div>
  )
}