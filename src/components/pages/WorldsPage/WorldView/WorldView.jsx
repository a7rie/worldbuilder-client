import { useEffect, useContext } from "react"
import { UserContext } from "../../../../contexts/UserContext"
import { world_overview } from "../../../../api/worlds"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import WorldOverview from "./WorldOverview/WorldOverview"
import { WorldsContext } from "../../../../contexts/WorldsContext"

export default function WorldView({ worldId, setAlertMessage }) {
  const { user } = useContext(UserContext)

  const { worldDetails, setWorldDetails } = useContext(WorldsContext)

  useEffect(() => {
    if (!worldId) {
      return
    }
    world_overview(user.token, worldId)
      .then(response => {
        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }
          setWorldDetails(data)
        })
      }).catch(err => {
        setAlertMessage(err.message)
      })

  }, [worldId, setAlertMessage, user.token, setWorldDetails])

  if (Object.keys(worldDetails).length === 0) {
    return <div>no world selected</div>
  }

  return (
    <Container fluid>
      <Row>
        <Col md={1}></Col>
        <Col md={10}>
          <Row className="mb-3">
            <Col md={12} className="text-center">
              <h1>{worldDetails.world_name}</h1>
            </Col>
          </Row>
          <WorldOverview />
        </Col>
      </Row>
      <Col md={1}></Col>
    </Container>
  )
}