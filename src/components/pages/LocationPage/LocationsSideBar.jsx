
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { useContext, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import CreateLocationModalButton from "../../common/Modals/CreateLocationModal/CreateLocationModalButton"

export default function LocationsSideBar() {
  const { setSelectedLocationId, worldDetails } = useContext(WorldsContext)
    const [collapsed, setCollapsed] = useState(false)  // eslint-disable-line

  function handleSelect(locationId) {
    setSelectedLocationId(locationId)
  }

  if (worldDetails || worldDetails.locations === null) {
    return null
  }

  return (
    <div>
      <Sidebar collapsed={collapsed}>
        <center>Locations in {worldDetails.world_name}</center>
        <hr/>
        <Menu>
          <MenuItem><CreateLocationModalButton /></MenuItem>
          {worldDetails.locations.map(location => (
            <MenuItem onClick={() => handleSelect(location.location_id)} key={location.location_id}>{location.location_name}</MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  )
}