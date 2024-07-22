import { useContext, useEffect, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { UserContext } from "../../../contexts/UserContext"
import { item_overview } from "../../../api/worlds"
import CharactersTable from "../../common/Tables/CharactersTable"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import EditItemOwnersModalButton from "../../common/Modals/EditItemOwnersModal/EditItemOwnersModalButton"
import EditItemModalButton from "../../common/Modals/CreateItemModal/EditItemModalButton"


export default function ItemView() {
  const { selectedItemId, worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const worldId = worldDetails.world_id

  const [itemDetails, setItemDetails] = useState({})
  const [itemUpdated, setItemUpdated] = useState(false)

  useEffect(() => {
    if (!selectedItemId) {
      return
    }
    item_overview(token, worldId, selectedItemId)
      .then(response => {
        if (!response.ok) {
          console.error("Unable to retrieve item details")
          return
        }
        response.json().then(data => {
          setItemDetails(data)
        })
      }).catch(err => {
        console.error(err.message)
      })

  }, [selectedItemId, token, worldId, itemUpdated])

  if (Object.keys(itemDetails).length === 0) {
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
              <h1>{itemDetails.item_name}</h1>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12} className="text-center">
              <EditItemModalButton itemDetails={itemDetails} setItemUpdated={setItemUpdated} />
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={12}>
              <b>Description: </b> {itemDetails.item_description}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <b>Item Owners</b> <EditItemOwnersModalButton itemDetails={itemDetails} setItemDetails={setItemDetails} />
              <CharactersTable characters={itemDetails.characters} />
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