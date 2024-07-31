import { SERVER_ENDPOINT } from "../../constants"

export function login(username, password) {
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  }
  return fetch(SERVER_ENDPOINT + "/login", fetchParams)
}

export function register(username, password) {
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  }
  return fetch(SERVER_ENDPOINT + "/users", fetchParams)
}