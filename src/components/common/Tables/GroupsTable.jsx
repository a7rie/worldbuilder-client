import Table from "react-bootstrap/Table"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { Link } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext"
import { useContext } from "react"

export default function GroupsTable({ groups }) {

  const { setSelectedGroupId,worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const groupsPath = `/${user.username}/worlds/${worldDetails.world_id}/groups`

  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <tr key={group.group_id}>
            <td><Link onClick={() => setSelectedGroupId(group.group_id)}to={groupsPath}>{group.group_name}</Link></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}