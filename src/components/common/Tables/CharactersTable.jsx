import { useContext } from "react"
import Table from "react-bootstrap/Table"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { Link } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext"

export default function CharactersTable({ characters }) {
  const { setSelectedCharacterId,worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)

  const charactersPath = `/${user.username}/worlds/${worldDetails.world_id}/characters`

  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(char => (
          <tr key={char.char_id}>
            <td><Link onClick={() => setSelectedCharacterId(char.char_id)}to={charactersPath}>{char.char_name}</Link></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}