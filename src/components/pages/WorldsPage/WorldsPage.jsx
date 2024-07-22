import { UserContext } from "../../../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import RedAlert from "../../common/RedAlert"
import WorldsSideBar from "./WorldsSideBar"
import { WorldsContext } from "../../../contexts/WorldsContext"
import { list_worlds } from "../../../api/worlds"
import WorldView from "./WorldView/WorldView"

export default function WorldsPage() {
  const { user, loading } = useContext(UserContext)
  const { setWorlds, selectedWorldId } = useContext(WorldsContext)
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    // if UserContext not finished updating
    if (loading) {
      return
    }

    if (!user.username) {
      navigate("/login")
      return
    }

    list_worlds(user.token).then(response => {
      if (response.status === 401) { // token expired
        navigate("/login")
        return
      }

      if (!response.ok) {
        setAlertMessage("Could not fetch data from server")
        return
      }

      response.json().then(data => {
        setWorlds(data)
      })

    }).catch(err => {
      setAlertMessage(err.message)
    })
  }, [user, navigate, setWorlds,loading])

  const style = {
    display: "flex",
  }

  return (
    <div>
      <RedAlert alertMessage={alertMessage} />
      <div style={style}>
        <WorldsSideBar />
        <WorldView worldId={selectedWorldId} setAlertMessage={setAlertMessage} />
      </div>
    </div>
  )
}
