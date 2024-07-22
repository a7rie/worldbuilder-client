import { useContext, useEffect } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { useNavigate } from "react-router-dom"
import LocationsSideBar from "./LocationsSideBar"
import LocationView from "./LocationView"

export default function LocationPage() {
  const { user, loading } = useContext(UserContext)
  const { worldDetails } = useContext(WorldsContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return

    if (!user.username) {
      navigate("/login")
      return
    }

    // user refreshed, but we dont know what world they're in / which item they've selected -- in the future, could extract these from url
    // and make a separate request if they dont exist.
    if (Object.keys(worldDetails).length === 0) {
      navigate("/" + user.username + "/worlds")
      return
    }

  }, [user, loading, navigate, worldDetails])

  if (!user.username) {
    return null
  }

  const style = {
    display: "flex"
  }

  return (
    <div style={style}>
      <LocationsSideBar/>
      <LocationView />
      {/* <ItemView /> */}
    </div>
  )
}