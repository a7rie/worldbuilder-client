import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { useContext, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import CreateGroupModalButton from "../../common/Modals/CreateGroupModal/CreateGroupModalButton"

export default function GroupsSideBar() {
  const { setSelectedGroupId, worldDetails } = useContext(WorldsContext)
    const [collapsed] = useState(false)  // eslint-disable-line

  function handleSelect(groupId) {
    setSelectedGroupId(groupId)
  }

  if (worldDetails || worldDetails.groups === null) {
    return null
  }

  return (
    <div>
      <Sidebar collapsed={collapsed}>
        <center>Groups in {worldDetails.world_name}</center>
        <hr/>
        <Menu>
          <MenuItem><CreateGroupModalButton /></MenuItem>
          {worldDetails.groups.map(group => (
            <MenuItem onClick={() => handleSelect(group.group_id)} key={group.group_id}>{group.group_name}</MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  )
}