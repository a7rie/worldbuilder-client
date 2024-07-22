import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { useContext } from "react"
import SelectFromList from "../SelectFromList"

export default function ItemForm({ handleSubmit, prefilledFields, edit }) {

  const { worldDetails } = useContext(WorldsContext)
  const { characters } = worldDetails
  const [selectedCharacters, setSelectedCharacters] = useState([])

  const [formData, setFormData] = useState({
    name: prefilledFields.item_name || "",
    description: prefilledFields.item_description || ""
  })

  // format in way such that it can be passed to SelectFromList component, which can accept any type of entity
  const formattedCharacters = characters.map(c => (
    {
      ...c,
      id: c.char_id,
      name: c.char_name
    }
  ))

  const handleChange = (e) => {
    var { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }



  return (
    <Container fluid>
      <Form onSubmit={(e) => handleSubmit(e, formData, selectedCharacters)}>
        <Row className="mb-3">
          <Form.Text className="text-muted">
                        Name of item
          </Form.Text>
          <Form.Control name="name" onChange={handleChange} maxLength="30" value={formData.name} />
        </Row>
        <Row className="mb-3">
          <Form.Text className="text-muted">
                        Description
          </Form.Text>
          <Form.Control name="description" onChange={handleChange} maxLength="500" as="textarea" value={formData.description} />
        </Row>
        {!edit ?
          <Row className="mb-3">
            <Form.Label>Select Item Owners</Form.Label>
            <SelectFromList entities={formattedCharacters}
              setSelectedEntities={setSelectedCharacters}
              selectedEntities={selectedCharacters}
            />
          </Row>
          : null}
        <Button type="submit" disabled={!formData.name || !formData.description}>
                    Create
        </Button>
      </Form>
    </Container >
  )
}