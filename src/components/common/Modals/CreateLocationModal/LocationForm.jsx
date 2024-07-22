import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { LOCATION_TYPES } from "../../../../../constants"

export default function LocationForm({ handleSubmit, prefilledFields }) {

  const [formData, setFormData] = useState({
    name: prefilledFields.location_name || "",
    description: prefilledFields.location_description || "",
    location_type: prefilledFields.location_type || "",
    population: prefilledFields.location_population || ""
  })

  const handleChange = (e) => {
    var { name, value } = e.target
    if (name === "population") {
      value = parseInt(value)
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }


  return (
    <Container fluid>
      <Form onSubmit={(e) => handleSubmit(e, formData)}>
        <Row className="mb-3">
          <Form.Text className="text-muted">
            Name of location
          </Form.Text>
          <Form.Control name="name" onChange={handleChange} maxLength="30" value={formData.name} />
        </Row>
        <Row className="mb-3">
          <Form.Text className="text-muted">
            Description
          </Form.Text>
          <Form.Control name="description" onChange={handleChange} maxLength="500" as="textarea" value={formData.description} />
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Text className="text-muted">
              Population
            </Form.Text>
            <Form.Control name="population" onChange={handleChange} min="0" step="1" type="number" value={formData.population || ""} />
          </Col>
          <Col md={6}>
            <Form.Text className="text-muted">
              Type
            </Form.Text>
            <Form.Group name="event_type" onChange={handleChange}>
              {LOCATION_TYPES.map((option, idx) => (
                <Form.Check
                  key={idx}
                  inline
                  name="location_type"
                  type="radio"
                  label={option}
                  value={option}
                  defaultChecked={option === formData.location_type}
                />
              ))}
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" disabled={!formData.name || !formData.location_type}>
          Create
        </Button>
      </Form>
    </Container >
  )
}