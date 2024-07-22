import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { WorldsContext } from "../contexts/WorldsContext"
import { useContext } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function NavBar() {
  const { user, setUser } = useContext(UserContext)
  const { setWorldDetails, setSelectedWorldId } = useContext(WorldsContext)
  const navigate = useNavigate()

  function logout() {
    setUser({})
    setWorldDetails({})
    setSelectedWorldId(null)

    Cookies.remove("worldbuilderappusername")
    Cookies.remove("worldbuilderapptoken")
    navigate("/login")
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Worldbuilder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/${user.username}/worlds`} disabled={user.username === null}>Home</Nav.Link>
            {user.username
              ? <Nav.Link onClick={logout}>Logout</Nav.Link> // TODO
              :
              <>
                <Nav.Link as={Link} to="/login" >Login</Nav.Link>
                <Nav.Link as={Link} to="/register" >Register</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}