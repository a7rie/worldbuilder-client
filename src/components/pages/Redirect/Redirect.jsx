import { useContext, useEffect } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

export default function Redirect() {
  const { username } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (username) {
      navigate(`/${username}/worlds`)
    }
    navigate("/login")
  }, [navigate, username])
}