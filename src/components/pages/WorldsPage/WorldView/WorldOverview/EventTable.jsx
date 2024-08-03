import Table from "react-bootstrap/Table"
import { Link } from "react-router-dom"
import DeleteButton from "./buttons/DeleteButton"
import { useContext } from "react"
import { WorldsContext } from "../../../../../contexts/WorldsContext"

export default function EventTable() {
  const { worldDetails } = useContext(WorldsContext)
  const { setSelectedEventId } = useContext(WorldsContext)
  console.log(worldDetails.events)
  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan={3}>Description</th>
          <th>Type</th>
          <th>Date</th>
          <th>Location</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {worldDetails.events.map(event => (
          <tr key={event.event_id}>
            <td><Link onClick={() => setSelectedEventId(event.event_id)}to={`${worldDetails.world_id}/events`}>{event.event_name}</Link></td>
            <td colSpan={3}>{event.event_description}</td>
            <td>{event.event_type}</td>
            <td>{event.event_date}</td>
            <td>{event.location ? event.location.location_name : ""}</td>
            <td>
              <DeleteButton entityType="event" entityId={event.event_id} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}