import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { useContext, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import CreateEventModalButton from "../../common/Modals/CreateEventModal/CreateEventModalButton"

export default function EventsSideBar() {
  const { setSelectedEventId, worldDetails } = useContext(WorldsContext)
    const [collapsed, setCollapsed] = useState(false)  // eslint-disable-line

  function handleSelect(eventId) {
    setSelectedEventId(eventId)
  }

  if (worldDetails || worldDetails.events === null) {
    return null
  }

  return (
    <div>
      <Sidebar collapsed={collapsed}>
        <center>Events in {worldDetails.world_name}</center>
        <hr/>
        <Menu>
          <MenuItem><CreateEventModalButton /></MenuItem>
          {worldDetails.events.map(event => (
            <MenuItem onClick={() => handleSelect(event.event_id)} key={event.event_id}>{event.event_name}</MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  )
}