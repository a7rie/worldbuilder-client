import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import LoginPage from "./components/pages/LoginPage/LoginPage"
import WorldsPage from "./components/pages/WorldsPage/WorldsPage"
import { UserProvider } from "./contexts/UserContext"
import Redirect from "./components/pages/Redirect/Redirect"
import CharacterPage from "./components/pages/CharacterPage/CharacterPage"
import EventPage from "./components/pages/EventPage/EventPage"
import ItemPage from "./components/pages/ItemPage/ItemPage"
import LocationPage from "./components/pages/LocationPage/LocationPage"
import { WorldsProvider } from "./contexts/WorldsContext"
import GroupPage from "./components/pages/GroupPage/GroupPage"
import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage"

function App() {
  return (
    <UserProvider>
      <WorldsProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path={"/:username/worlds"} element={<WorldsPage />} />
            <Route path="/:username/worlds/:worldId/characters" element={<CharacterPage />} />
            <Route path="/:username/worlds/:worldId/events" element={<EventPage />} />
            <Route path="/:username/worlds/:worldId/items" element={<ItemPage />} />
            <Route path="/:username/worlds/:worldId/locations" element={<LocationPage />} />
            <Route path="/:username/worlds/:worldId/groups" element={<GroupPage />} />
            <Route path="*" element={<Redirect />} />
          </Routes>
        </Router>
      </WorldsProvider>
    </UserProvider>
  )
}

export default App
