import React from "react"
import { useState } from "react"

export const WorldsContext = React.createContext()

export const WorldsProvider = ({ children }) => {
  const [worldDetails, setWorldDetails] = useState({})
  const [worlds, setWorlds] = useState([])
  const [selectedWorldId, setSelectedWorldId] = useState(null)
  const [selectedCharacterId, setSelectedCharacterId] = useState(null)
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [selectedLocationId, setSelectedLocationId] = useState(null)
  const [selectedGroupId, setSelectedGroupId] = useState(null)

  return (
    <WorldsContext.Provider value={{
      worlds, setWorlds, worldDetails, setWorldDetails, selectedWorldId,
      setSelectedWorldId, selectedCharacterId, setSelectedCharacterId,
      selectedEventId, setSelectedEventId,
      selectedItemId, setSelectedItemId,
      selectedLocationId, setSelectedLocationId,
      selectedGroupId, setSelectedGroupId
    }}>
      {children}
    </WorldsContext.Provider>
  )
}