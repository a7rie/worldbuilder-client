import Table from "react-bootstrap/Table"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { Link } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext"
import { useContext } from "react"

export default function EventsTable({ events }) {

  const { setSelectedEventId,worldDetails } = useContext(WorldsContext)
  const { user } = useContext(UserContext)

  const eventsPath = `/${user.username}/worlds/${worldDetails.world_id}/events`

  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.event_id}>
            <td><Link onClick={() => setSelectedEventId(event.event_id)}to={eventsPath}>{event.event_name}</Link></td>
            <td>{event.event_date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}