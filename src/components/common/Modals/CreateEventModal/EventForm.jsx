import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { useContext } from "react"
import { EVENT_TYPES } from "../../../../../constants"
import SelectFromList from "../SelectFromList"

export default function EventForm({ handleSubmit, prefilledFields, edit }) {

  const { worldDetails } = useContext(WorldsContext)
  const { characters } = worldDetails

  let prefilledLocationId = null
  let prefilledChars = []
  if (prefilledFields) {
    if (prefilledFields.characters) {
      prefilledChars = prefilledFields.characters.map(c => c.char_id)
    }
    if (prefilledFields.location) {
      prefilledLocationId = prefilledFields.location.location_id
    }
  }

  const [formData, setFormData] = useState({
    name: prefilledFields.event_name || "",
    description: prefilledFields.event_description || "",
    date: prefilledFields.event_date || "",
    location_id: prefilledLocationId || "",
    event_type: prefilledFields.event_type || "",
    characters: prefilledChars
  })

  const [selectedCharacters, setSelectedCharacters] = useState([])

  const handleChange = (e) => {
    var { name, value } = e.target
    if (name === "location_id") {
      value = parseInt(value)
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // format in way such that it can be passed to SelectFromList component, which can accept any type of entity
  const formattedCharacters = characters.map(c => (
    {
      ...c,
      id: c.char_id,
      name: c.char_name
    }
  ))



  return (
    <Container fluid>
      <Form onSubmit={(e) => handleSubmit(e, { ...formData })}>
        <Row className="mb-3">
          <Form.Text className="text-muted">
                        Name of event
          </Form.Text>
          <Form.Control name="name" onChange={handleChange} maxLength="30" value={formData.name}/>
        </Row>
        <Row className="mb-3">
          <Form.Text className="text-muted">
                        Description
          </Form.Text>
          <Form.Control name="description" onChange={handleChange} maxLength="500" as="textarea"  value={formData.description}/>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Text className="text-muted">
                            Date
            </Form.Text>
            <Form.Control name="date" onChange={handleChange} type="date"  value={formData.date}/>
          </Col>
          <Col md={6}>
            <Form.Text className="text-muted">
                            Location
            </Form.Text>
            <Form.Select name="location_id" onChange={handleChange} defaultValue={formData.location_id}>
              <option value={null}></option>
              {worldDetails.locations.map(location => (
                <option key={location.location_id} value={location.location_id}>{location.location_name}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Text className="text-muted">
                        Event Type
          </Form.Text>
          <Form.Group name="event_type" onChange={handleChange}>
            {EVENT_TYPES.map((option, idx) => (
              <Form.Check
                key={idx}
                inline
                name="event_type"
                type="radio"
                label={option}
                value={option}
                defaultChecked={option === formData.event_type}
              />
            ))}
          </Form.Group>
        </Row>
        {!edit ?
          <Row className="mb-3">
            <Form.Text className="text-muted">
                            Participating Characters
            </Form.Text>
            <SelectFromList entities={formattedCharacters}
              setSelectedEntities={setSelectedCharacters}
              selectedEntities={selectedCharacters}
            />
          </Row>
          : null}

        <Button type="submit" disabled={!formData.name || !formData.event_type}>
          {edit ? "Edit Event" : "Create Event"}
        </Button>
      </Form>
    </Container >
  )
}