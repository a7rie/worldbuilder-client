import { UserContext } from "../../../contexts/UserContext"
import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import CharactersSideBar from "./CharactersSideBar"
import CharacterView from "./CharacterView"
import { WorldsContext } from "../../../contexts/WorldsContext"

export default function CharacterPage() {
  const { user, loading } = useContext(UserContext)
  const { worldDetails } = useContext(WorldsContext)

  const navigate = useNavigate()
  useEffect(() => {
    // if UserContext hasnt yet updated
    if (loading) return

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

  const style = {
    display: "flex",
  }
  return (
    <div style={style}>
      <CharactersSideBar />
      <CharacterView />
    </div>
  )

}