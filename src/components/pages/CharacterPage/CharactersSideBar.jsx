import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { useContext, useState } from "react"
import { WorldsContext } from "../../../contexts/WorldsContext"
import CreateCharacterModalButton from "../../common/Modals/CreateCharacterModal/CreateCharacterModalButton"

export default function CharactersSideBar() {
  const { setSelectedCharacterId, worldDetails } = useContext(WorldsContext)
    const [collapsed, setCollapsed] = useState(false)  // eslint-disable-line


  function handleSelect(charId) {
    setSelectedCharacterId(charId)
  }

  if (worldDetails.characters === null) {
    return
  }

  return (
    <div>
      <Sidebar collapsed={collapsed}>
        <center>Characters in {worldDetails.world_name}</center>
        <hr/>
        <Menu>
          <MenuItem><CreateCharacterModalButton /></MenuItem>
          {worldDetails.characters.map(char => (
            <MenuItem onClick={() => handleSelect(char.char_id)} key={char.char_id}>{char.char_name}</MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  )
}