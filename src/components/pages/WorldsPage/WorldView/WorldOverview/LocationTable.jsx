import Table from "react-bootstrap/Table"
import { useContext } from "react"
import { WorldsContext } from "../../../../../contexts/WorldsContext"
import DeleteButton from "./buttons/DeleteButton"
import { Link } from "react-router-dom"

export default function LocationTable() {
  const { worldDetails, setSelectedLocationId } = useContext(WorldsContext)
  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan={3}>Description</th>
          <th>Population</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {worldDetails.locations.map(location => (
          <tr key={location.location_id}>
            <td><Link onClick={() => setSelectedLocationId(location.location_id)} to={`${worldDetails.world_id}/locations`}>{location.location_name}</Link></td>
            <td colSpan={3}>{location.location_description}</td>
            <td>{location.location_population}</td>
            <td><DeleteButton entityType="location" entityId={location.location_id} /></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}