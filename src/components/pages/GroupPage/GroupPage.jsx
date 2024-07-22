import { UserContext } from "../../../contexts/UserContext"
import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
// import EventView from "./EventView/EventView"
// import EventsSideBar from "./EventsSideBar"
import { WorldsContext } from "../../../contexts/WorldsContext"
import GroupsSideBar from "./GroupsSideBar"
import GroupView from "./GroupView"

export default function GroupPage() {
  const { user, loading } = useContext(UserContext)
  const { worldDetails } = useContext(WorldsContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return

    // no user set -> go to login page
    if (!user.username) {
      navigate("/login")
      return
    }

    // if this page is refreshed, worldDetails will be null as CharacterPage is specific to a particular world selected -- right now, just redirect to the homepage on refresh. in the future, potentially make a server request to populate the context if it doesn't exist.
    if (Object.keys(worldDetails).length === 0) {
      navigate("/" + user.username + "/worlds")
      return
    }

  }, [user, loading, navigate, worldDetails])

  if (!user.username) {
    return null
  }

  const style = {
    display: "flex",
  }

  return (
    <div style={style}>
      <GroupsSideBar />
      <GroupView />
    </div>
  )

}