import React, { useEffect } from "react"
import { useState } from "react"
import Cookies from "js-cookie"

export const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // if user not already logged in + there are existing tokens, try to use these.
    if (!user.username) {
      const token = Cookies.get("worldbuilderapptoken")
      const username = Cookies.get("worldbuilderappusername")
      if (token && username) {
        setUser({
          token,
          username
        })

      }
    }
    setLoading(false)
  }, [user.username])


  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}