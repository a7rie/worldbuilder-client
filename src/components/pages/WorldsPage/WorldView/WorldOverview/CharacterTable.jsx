import Table from "react-bootstrap/Table"
import { Link } from "react-router-dom"
import DeleteButton from "./buttons/DeleteButton"
import { useContext } from "react"
import { WorldsContext } from "../../../../../contexts/WorldsContext"

export default function CharacterTable() {
  const { setSelectedCharacterId } = useContext(WorldsContext)
  const { worldDetails } = useContext(WorldsContext)
  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan={3}>Description</th>
          <th>Morality</th>
          <th>Delete</th>

        </tr>
      </thead>
      <tbody>
        {worldDetails.characters.map(char => (
          <tr key={char.char_id}>
            <td><Link onClick={() => setSelectedCharacterId(char.char_id)}to={`${worldDetails.world_id}/characters`}>{char.char_name}</Link></td>
            <td colSpan={3}>{char.char_description}</td>
            <td>{char.char_morality}</td>
            <td>
              <DeleteButton entityType="character" entityId={char.char_id}/>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}