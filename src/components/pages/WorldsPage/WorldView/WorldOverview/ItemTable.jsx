import Table from "react-bootstrap/Table"
import { useContext, useEffect } from "react"
import { WorldsContext } from "../../../../../contexts/WorldsContext"
import DeleteButton from "./buttons/DeleteButton"
import { Link } from "react-router-dom"

export default function ItemTable() {
  const { worldDetails, setSelectedItemId } = useContext(WorldsContext)

  useEffect(() => {

  })
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
        {worldDetails.items.map(item => (
          <tr key={item.item_id}>
            <td><Link onClick={() => setSelectedItemId(item.item_id)} to={`${worldDetails.world_id}/items`}>{item.item_name}</Link></td>
            <td colSpan={3}>{item.item_description}</td>
            <td><DeleteButton entityType="item" entityId={item.item_id} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}