import Table from "react-bootstrap/Table"
import { useContext } from "react"
import { WorldsContext } from "../../../../../contexts/WorldsContext"
import DeleteButton from "./buttons/DeleteButton"
import { Link } from "react-router-dom"
export default function GroupTable() {
  const { worldDetails, setSelectedGroupId } = useContext(WorldsContext)

  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan={3}>Description</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {worldDetails.groups.map(group => (
          <tr key={group.group_id}>
            <td><Link onClick={() => setSelectedGroupId(group.group_id)} to={`${worldDetails.world_id}/groups`}>{group.group_name}</Link></td>
            <td colSpan={3}>{group.group_description}</td>
            <td><DeleteButton entityType="group" entityId={group.group_id} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}