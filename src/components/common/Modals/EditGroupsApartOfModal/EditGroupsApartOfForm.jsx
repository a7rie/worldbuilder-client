import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { useContext } from "react"
import SelectFromList from "../SelectFromList"
import { update_char_groups } from "../../../../api/worlds"

export default function EditGroupsApartOfForm({ setAlertMessage, handleClose, groupsApartOf, characterDetails, setCharacterDetails }) {

  const { user } = useContext(UserContext)
  const token = user.token

  const { worldDetails, selectedCharacterId } = useContext(WorldsContext)
  const worldId = worldDetails.world_id
  const groups = worldDetails.groups

  groupsApartOf = groupsApartOf.map(group => (
    group.group_id
  ))

  const [selectedGroups, setSelectedGroups] = useState(groupsApartOf)

  // format in way such that it can be passed to SelectFromList component, which can accept any type of entity
  const formattedGroups = groups.map(group => (
    {
      ...group,
      id: group.group_id,
      name: group.group_name
    }
  ))


  const handleSubmit = (e) => {
    e.preventDefault()
    update_char_groups(token, worldId, selectedCharacterId, selectedGroups)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            if (!response.ok) {
              setAlertMessage(data.error)
              return
            }
          })
        }

        let newGroupsForCharacter = worldDetails.groups.filter(group => selectedGroups.includes(group.group_id))
        newGroupsForCharacter = newGroupsForCharacter.map(group => ({
          group_id: group.group_id,
          group_name: group.group_name,
          group_description: group.group_description
        }))

        setCharacterDetails({
          ...characterDetails,
          groups: newGroupsForCharacter
        }
        )

        handleClose(true)

      }).catch(err => {
        setAlertMessage(err.message)
      })
  }

  /**
   * TODO: more robust check on button being disabled
   */
  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>

        <SelectFromList entities={formattedGroups}
          setSelectedEntities={setSelectedGroups}
          selectedEntities={selectedGroups}
        />
        <Button type="submit" disabled={selectedGroups === groupsApartOf}>
          Update
        </Button>
      </Form>
    </Container >
  )
}