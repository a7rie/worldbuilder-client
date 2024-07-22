import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState, useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { login } from "../../../api/users"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

export default function LoginForm({ setAlertMessage }) {

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(event) {
    event.preventDefault()
    login(username, password)
      .then(response => {
        if (!response.ok) {
          setAlertMessage("Login failed -- review your credentials.")
          return
        }
        response.json().then(data => {
          setUser(data) // returned object should be object containing fields 'username' and 'token'
          Cookies.set("worldbuilderapptoken", data.token, { sameSite: "strict" })
          Cookies.set("worldbuilderappusername", data.username, { sameSite: "strict" })
          navigate(`/${username}/worlds`)
        })
      }).catch(err => {
        setAlertMessage(err.message)
      })
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={({ target }) => setPassword(target.value)} type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleLogin} disabled={!username || !password}>
        Login
      </Button>
    </Form>
  )
}
