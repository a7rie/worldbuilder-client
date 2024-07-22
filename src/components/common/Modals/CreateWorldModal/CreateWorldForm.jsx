import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { useContext } from "react"
import { add_world } from "../../../../api/worlds"

export default function CreateCharacterForm({ setAlertMessage, handleClose }) {

  const { setWorlds, worlds, setSelectedWorldId } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestData = {...formData, owner: user.username }
    add_world(token, requestData)
      .then(response => {
        response.json().then(data => {
          if (!response.ok) {
            setAlertMessage(data.error)
            return
          }

          const newWorld = {
            world_id: data.world_id,
            world_name: formData.name,
            world_description: formData.name,
            username: user.username,
          }

          const newWorlds = [ newWorld, ...worlds,]
          setWorlds(newWorlds)
          setSelectedWorldId(data.world_id)
          handleClose(true)
          setAlertMessage("")
        })

      }).catch(err => {
        setAlertMessage(err.message)
      })
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Text className="text-muted">
            Name of world
          </Form.Text>
          <Form.Control name="name" onChange={handleChange} maxLength="30" />
        </Row>
        <Row className="mb-3">
          <Form.Text className="text-muted">
            Description
          </Form.Text>
          <Form.Control name="description" onChange={handleChange} maxLength="300"  as="textarea" />
        </Row>
        <Button type="submit" disabled={!formData.name || !formData.description}>
          Create
        </Button>
      </Form>
    </Container >
  )
}