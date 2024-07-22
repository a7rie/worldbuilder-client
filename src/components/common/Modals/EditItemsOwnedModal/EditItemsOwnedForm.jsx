import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"
import { useState } from "react"
import { WorldsContext } from "../../../../contexts/WorldsContext"
import { UserContext } from "../../../../contexts/UserContext"
import { useContext } from "react"
import SelectFromList from "../SelectFromList"
import { update_char_items } from "../../../../api/worlds"

export default function EditItemsOwnedForm({ setAlertMessage, handleClose, itemsOwned, characterDetails, setCharacterDetails }) {

  const { user } = useContext(UserContext)
  const token = user.token

  const { worldDetails, selectedCharacterId } = useContext(WorldsContext)
  const worldId = worldDetails.world_id
  const items = worldDetails.items

  itemsOwned = itemsOwned.map(i => (
    i.item_id
  ))

  const [selectedItems, setSelectedItems] = useState(itemsOwned)

  // format in way such that it can be passed to SelectFromList component, which can accept any type of entity
  const formattedItems = items.map(item => (
    {
      ...item,
      id: item.item_id,
      name: item.item_name
    }
  ))


  const handleSubmit = (e) => {
    e.preventDefault()

    update_char_items(token, worldId, selectedCharacterId, selectedItems)
      .then(response => {
        if (!response.ok) {
          response.json().then(data => {
            if (!response.ok) {
              setAlertMessage(data.error)
              return
            }
          })
        }

        let newItemsForCharacter = worldDetails.items.filter(item => selectedItems.includes(item.item_id))
        newItemsForCharacter = newItemsForCharacter.map(item => ({
          item_id: item.item_id,
          item_name: item.item_name,
          item_description: item.item_description
        }))

        setCharacterDetails({
          ...characterDetails,
          items: newItemsForCharacter
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

        <SelectFromList entities={formattedItems}
          setSelectedEntities={setSelectedItems}
          selectedEntities={selectedItems}
        />
        <Button type="submit" disabled={selectedItems === itemsOwned}>
          Update
        </Button>
      </Form>
    </Container >
  )
}