import Form from "react-bootstrap/Form"

export default function SelectFromList({ entities, setSelectedEntities, selectedEntities }) {

  const handleChange = (event, entity) => {
    const { checked } = event.target
    if (checked) {
      setSelectedEntities([...selectedEntities, entity.id])
    }
    else {
      setSelectedEntities(selectedEntities.filter(entityId => entityId !== entity.id))
    }
  }

  const style = {
    height: "250px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    resize: "vertical"
  }

  return (
    <Form.Group name="selectParticipatingCharacters" style={style}>
      {entities.map(e => (
        <Form.Check
          inline
          label={`${e.name}`}
          name="selectchars"
          type="checkbox"
          checked={selectedEntities.includes(e.id)}
          onChange={event => handleChange(event, e)}
          key={e.id}
        />
      ))}
    </Form.Group>
  )
}