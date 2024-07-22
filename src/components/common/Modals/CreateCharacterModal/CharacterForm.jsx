import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { useContext } from "react"
import { MORALITY_OPTIONS } from "../../../../../constants"

export default function CharacterForm({ handleSubmit, prefilledFields, edit }) {
  const { worldDetails } = useContext(WorldsContext)

  const [formData, setFormData] = useState({
    name: prefilledFields.char_name || "",
    description: prefilledFields.char_description || "",
    appearance: prefilledFields.char_appearance || "",
    backstory: prefilledFields.char_backstory || "",
    birth_date: prefilledFields.char_birth_date || "",
    death_date: prefilledFields.char_death_date || "",
    morality: prefilledFields.char_morality || "",
    location_id: prefilledFields.location_id || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  let prefilledLocationName = worldDetails.locations.find(loc => loc.location_id === prefilledFields.location_id)
  prefilledLocationName ? prefilledLocationName = prefilledLocationName.location_name : prefilledFields = ""

  return (
    <Container fluid>
      <Form onSubmit={(e) => handleSubmit(e, {...formData})}>
        <Row className="mb-3">
          <Form.Text className="text-muted">
                        Name of character
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
          <Form.Text className="text-muted">
                        Appearance
          </Form.Text>
          <Form.Control name="appearance" onChange={handleChange} maxLength="500" as="textarea" value={formData.appearance} />
        </Row>
        <Row className="mb-3">
          <Form.Text className="text-muted">
                        Backstory
          </Form.Text>
          <Form.Control name="backstory" onChange={handleChange} maxLength="500" as="textarea" value={formData.backstory} />
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Text className="text-muted">
                            Date Born
            </Form.Text>
            <Form.Control name="birth_date" onChange={handleChange} type="date" value={formData.birth_date} />
          </Col>
          <Col md={6}>
            <Form.Text className="text-muted">
                            Date Died
            </Form.Text>
            <Form.Control name="death_date" onChange={handleChange} type="date" value={formData.death_date} />
          </Col>
        </Row>
        <Row className="mb-3">
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
          <Col md={6}>
            <Form.Text className="text-muted">
                            Morality
            </Form.Text>
            <Form.Group name="morality" onChange={handleChange}>
              {MORALITY_OPTIONS.map((option, idx) => (
                <Form.Check
                  key={idx}
                  inline
                  name="morality"
                  type="radio"
                  label={option}
                  value={option}
                  defaultChecked={option === formData.morality}
                />
              ))}
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" disabled={!formData.name}>
          {edit ? "Edit" : "Create"}
        </Button>
      </Form>
    </Container >
  )
}