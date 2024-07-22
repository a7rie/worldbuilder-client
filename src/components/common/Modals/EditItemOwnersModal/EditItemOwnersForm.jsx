import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { useContext } from "react"
import SelectFromList from "../SelectFromList"
import { update_item_owners } from "../../../../api/worlds"

export default function EditItemOwnersForm({ setAlertMessage, handleClose, itemDetails, setItemDetails }) {

  const { user } = useContext(UserContext)
  const token = user.token

  const { worldDetails, selectedItemId } = useContext(WorldsContext)
  const worldId = worldDetails.world_id
  const characters = worldDetails.characters

  let itemOwners = itemDetails.characters
  itemOwners = itemOwners.map(char => (
    char.char_id
  ))

  const [selectedCharacters, setSelectedCharacters] = useState(itemOwners)

  // format in way such that it can be passed to SelectFromList component, which can accept any type of entity
  const formattedCharacters = characters.map(char => (
    {
      id: char.char_id,
      name: char.char_name
    }
  ))


  const handleSubmit = (e) => {
    e.preventDefault()
    update_item_owners(token, worldId, selectedItemId, selectedCharacters)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            if (!response.ok) {
              setAlertMessage(data.error)
              return
            }
          })
        }

        let newCharactersForItem = worldDetails.characters.filter(char => selectedCharacters.includes(char.char_id))
        newCharactersForItem = newCharactersForItem.map(char => ({
          char_id: char.char_id,
          char_name: char.char_name,
        }))

        setItemDetails({
          ...itemDetails,
          characters: newCharactersForItem
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
        <Button type="submit" disabled={selectedCharacters === itemOwners}>
          Update
        </Button>
      </Form>
    </Container >
  )
}