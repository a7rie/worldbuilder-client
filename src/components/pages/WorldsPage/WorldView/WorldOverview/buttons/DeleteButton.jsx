import Button from "react-bootstrap/Button"
import { useContext } from "react"
import { WorldsContext } from "../../../../../../contexts/WorldsContext"
import { entityTypeToIDFieldName } from "../../../../../../../constants"
import { delete_entity } from "../../../../../../api/worlds"
import { UserContext } from "../../../../../../contexts/UserContext"

export default function DeleteButton({ entityType, entityId }) {
  const { worldDetails, setWorldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const token = user.token
  function handleDelete() {
    const entityTypePlural = entityType + "s" // for accessing appropriate field in worldDetails; e.g. must access worldDetail.characters, not worldDetails.character
    const worldId = worldDetails.world_id
    delete_entity(token, worldId, entityTypePlural, entityId).then(response => {
      if (!response.ok) {
        console.error("Could not delete " + entityType + " with ID: " + entityId)
        return
      }

      const entityIdField = entityTypeToIDFieldName[entityType]
      const updatedWorldDetails = {
        ...worldDetails,
        // remove entity where ID = passed ID
        [entityTypePlural]: worldDetails[entityTypePlural].filter(e => e[entityIdField] !== entityId)
      }
      setWorldDetails(updatedWorldDetails)

    })

  }

  return (
    <Button onClick={handleDelete} variant="outline-danger" size="sm">
      Delete
    </Button>
  )
}