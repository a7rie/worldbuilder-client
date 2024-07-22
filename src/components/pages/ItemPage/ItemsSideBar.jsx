
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { useContext, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import CreateItemModalButton from "../../common/Modals/CreateItemModal/CreateItemModalButton"

export default function ItemsSideBar() {
  const { setSelectedItemId, worldDetails } = useContext(WorldsContext)
    const [collapsed, setCollapsed] = useState(false)  // eslint-disable-line

  function handleSelect(itemId) {
    setSelectedItemId(itemId)
  }

  if (worldDetails || worldDetails.items === null) {
    return null
  }

  return (
    <div>
      <Sidebar collapsed={collapsed}>
        <center>Items in {worldDetails.world_name}</center>
        <hr/>
        <Menu>
          <MenuItem><CreateItemModalButton /></MenuItem>
          {worldDetails.items.map(item => (
            <MenuItem onClick={() => handleSelect(item.item_id)} key={item.item_id}>{item.item_name}</MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  )
}