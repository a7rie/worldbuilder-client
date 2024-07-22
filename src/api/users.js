const baseUrl = "http://localhost:3001/api/"

export function login(username, password) {
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  }
  return fetch(baseUrl + "login", fetchParams)
}

export function register(username, password) {
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  }
  return fetch(baseUrl + "users", fetchParams)
}