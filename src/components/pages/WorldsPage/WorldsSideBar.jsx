import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { useContext, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import CreateWorldModalButton from "../../common/Modals/CreateWorldModal/CreateWorldModalButton"

export default function WorldsSideBar() {
  const { worlds, setSelectedWorldId } = useContext(WorldsContext)
    const [collapsed, setCollapsed] = useState(false)  // eslint-disable-line
  function handleSelect(worldId) {
    setSelectedWorldId(worldId)
  }

  return (
    <div>
      <Sidebar  collapsed={collapsed}>
        <center>Your Worlds</center>
        <hr/>
        <Menu>
          <MenuItem><CreateWorldModalButton /></MenuItem>
          {worlds.map(world => (
            <MenuItem onClick={() => handleSelect(world.world_id)} key={world.world_id}>{world.world_name}</MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  )
}