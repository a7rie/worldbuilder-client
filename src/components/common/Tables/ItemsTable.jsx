import Table from "react-bootstrap/Table"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { Link } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext"
import { useContext } from "react"

export default function ItemsTable({ items }) {

  const { setSelectedItemId,worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)
  const itemsPath = `/${user.username}/worlds/${worldDetails.world_id}/items`

  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan={3}>Description</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.item_id}>
            <td><Link onClick={() => setSelectedItemId(item.item_id)}to={itemsPath}>{item.item_name}</Link></td>
            <td colSpan={3}>{item.item_description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}