import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { useContext } from "react"
import { add_relationship } from "../../../../api/worlds"
import { RELATIONSHIP_TYPES } from "../../../../../constants"

export default function CreateRelationshipForm({ setAlertMessage, handleClose, characterDetails, setCharacterDetails }) {

  const { worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const [formData, setFormData] = useState({
    char_id: "",
    relationship_type: "",
    relationship_description: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }


  const existingRelationships = characterDetails.relationships.map(r => r.char_id)

  const availableCharactersToSelect = worldDetails.characters.filter(char => {
    if (char.char_id === characterDetails.char_id) {
      return false
    }
    if (existingRelationships.includes(char.char_id)) {
      return false
    }
    return true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      char_id: Number(formData.char_id)
    }

    add_relationship(token, worldDetails.world_id, characterDetails.char_id, payload)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            setAlertMessage(data.error)
            return
          })
        }

        const characterSelected = availableCharactersToSelect.find(char => char.char_id.toString() === formData.char_id)
        console.log(availableCharactersToSelect, characterSelected, formData.char_id)
        const newRelationship = {
          char_id: characterSelected.char_id,
          char_name: characterSelected.char_name,
          relationship_type: formData.relationship_type,
          relationship_description: formData.relationship_description
        }

        const newRelationships = [...characterDetails.relationships, newRelationship]

        setCharacterDetails({
          ...characterDetails,
          relationships: newRelationships
        })

        handleClose(true)
        setAlertMessage("")
      })
      .catch(err => {
        setAlertMessage(err.message)
      })
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Text className="text-muted">
            Character to have relationship with
          </Form.Text>
          <Form.Select name="char_id" onChange={handleChange}>
            <option value={null}></option>
            {availableCharactersToSelect.map(char => (
              <option key={char.char_id} value={char.char_id}>{char.char_name}</option>
            ))}
          </Form.Select>
        </Row>
        <Row className="mb-3">
          <Form.Text className="text-muted">
            Description
          </Form.Text>
          <Form.Control name="relationship_description" onChange={handleChange} maxLength="1024" as="textarea" />
        </Row>



        <Row className="mb-3">
          <Form.Text className="text-muted">
            Relationship Type
          </Form.Text>
          <Form.Group name="relationship_type" onChange={handleChange}>
            {RELATIONSHIP_TYPES.map((option, idx) => (
              <Form.Check
                key={idx}
                inline
                name="relationship_type"
                type="radio"
                label={option}
                value={option}
              />
            ))}
          </Form.Group>
        </Row>
        <Button type="submit" disabled={!formData.char_id && !formData.relationship_type}>
          Create
        </Button>
      </Form>
    </Container >
  )
}