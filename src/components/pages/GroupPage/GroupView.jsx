import { useContext, useEffect, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { UserContext } from "../../../contexts/UserContext"
import { group_overview } from "../../../api/worlds"
import CharactersTable from "../../common/Tables/CharactersTable"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import EditGroupMembersModalButton from "../../common/Modals/EditMembersOfGroupModal/EditGroupMembersModalButton"
import EditGroupModalButton from "../../common/Modals/CreateGroupModal/EditGroupModalButton"


export default function GroupView() {
  const { selectedGroupId, worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const worldId = worldDetails.world_id

  const [groupDetails, setGroupDetails] = useState({})
  const [groupUpdated, setGroupUpdated] = useState(false)

  useEffect(() => {
    if (!selectedGroupId) {
      return
    }
    group_overview(token, worldId, selectedGroupId)
      .then(response => {
        if (!response.ok) {
          console.error("Unable to retrieve group details")
          return
        }
        response.json().then(data => {
          setGroupDetails(data)
        })
      }).catch(err => {
        console.error(err.message)
      })

  }, [selectedGroupId, token, worldId, groupUpdated])

  if (Object.keys(groupDetails).length === 0) {
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
              <h1>{groupDetails.group_name}</h1>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12} className="text-center">
              <EditGroupModalButton groupDetails={groupDetails} setGroupUpdated={setGroupUpdated} />
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={12}>
              <b>Description: </b> {groupDetails.group_description}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <b>Group Members</b> <EditGroupMembersModalButton groupDetails={groupDetails} setGroupDetails={setGroupDetails} />
              <CharactersTable characters={groupDetails.characters} />
            </Col>

          </Row>
        </Col>
      </Row>
      <Col md={1}></Col>
    </Container>
  )
}