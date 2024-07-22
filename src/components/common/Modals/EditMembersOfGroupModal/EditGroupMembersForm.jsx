import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { useContext } from "react"
import SelectFromList from "../SelectFromList"
import { update_group_members } from "../../../../api/worlds"

export default function EditGroupMembersForm({ setAlertMessage, handleClose, groupDetails, setGroupDetails }) {

  const { user } = useContext(UserContext)
  const token = user.token

  const { worldDetails, selectedGroupId } = useContext(WorldsContext)
  const worldId = worldDetails.world_id
  const characters = worldDetails.characters

  let groupMembers = groupDetails.characters
  groupMembers = groupMembers.map(char => (
    char.char_id
  ))

  const [selectedCharacters, setSelectedCharacters] = useState(groupMembers)

  // format in way such that it can be passed to SelectFromList component, which can accept any type of entity
  const formattedCharacters = characters.map(char => (
    {
      id: char.char_id,
      name: char.char_name
    }
  ))



  const handleSubmit = (e) => {
    e.preventDefault()
    update_group_members(token, worldId, selectedGroupId, selectedCharacters)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            if (!response.ok) {
              setAlertMessage(data.error)
              return
            }
          })
        }

        let newCharactersForGroup = worldDetails.characters.filter(char => selectedCharacters.includes(char.char_id))
        newCharactersForGroup = newCharactersForGroup.map(char => ({
          char_id: char.char_id,
          char_name: char.char_name,
        }))

        setGroupDetails({
          ...groupDetails,
          characters: newCharactersForGroup
        })

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

        <SelectFromList entities={formattedCharacters}
          setSelectedEntities={setSelectedCharacters}
          selectedEntities={selectedCharacters}
        />
        <Button type="submit" disabled={selectedCharacters === groupMembers}>
          Update
        </Button>
      </Form>
    </Container >
  )
}