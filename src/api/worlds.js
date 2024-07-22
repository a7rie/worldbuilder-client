const baseUrl = "http://localhost:3001/api/worlds"

function cleanFormData(formData) {
  for (var key in formData) {
    if (formData[key] === "" || !formData[key]) {
      delete formData[key]
    }
  }
  return formData
}

export function list_worlds(token) {
  const fetchParams = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(baseUrl, fetchParams)
}

export function world_overview(token, worldId) {
  const fetchParams = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(`${baseUrl}/${worldId}`, fetchParams)
}


export function character_overview(token, worldId, characterId) {
  const fetchParams = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(`${baseUrl}/${worldId}/characters/${characterId}`, fetchParams)
}

export function event_overview(token, worldId, eventId) {
  const fetchParams = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(`${baseUrl}/${worldId}/events/${eventId}`, fetchParams)
}


export function item_overview(token, worldId, itemId) {
  const fetchParams = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(`${baseUrl}/${worldId}/items/${itemId}`, fetchParams)
}

export function location_overview(token, worldId, locationId) {
  const fetchParams = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(`${baseUrl}/${worldId}/locations/${locationId}`, fetchParams)
}

export function group_overview(token, worldId, groupId) {
  const fetchParams = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(`${baseUrl}/${worldId}/groups/${groupId}`, fetchParams)
}

export function add_character(token, worldId, characterData) {
  characterData = cleanFormData(characterData)
  for (var key in characterData) {
    if (characterData[key] === "") {
      delete characterData[key]
    }
  }
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(characterData)
  }

  return fetch(`${baseUrl}/${worldId}/characters`, fetchParams)
}

export function add_event(token, worldId, eventData) {
  eventData = cleanFormData(eventData)
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData)
  }
  return fetch(`${baseUrl}/${worldId}/events`, fetchParams)
}

export function add_world(token, worldData) {
  worldData = cleanFormData(worldData)
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(worldData)
  }
  return fetch(baseUrl, fetchParams)
}

export function add_item(token, worldId, itemData) {
  itemData = cleanFormData(itemData)
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData)
  }
  return fetch(`${baseUrl}/${worldId}/items`, fetchParams)
}

export function add_location(token, worldId, locationData) {
  locationData = cleanFormData(locationData)
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(locationData)
  }
  return fetch(`${baseUrl}/${worldId}/locations`, fetchParams)
}

export function add_group(token, worldId, groupData) {
  groupData = cleanFormData(groupData)
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(groupData)
  }
  return fetch(`${baseUrl}/${worldId}/groups`, fetchParams)
}

export function delete_entity(token, worldId, entityPlural, entityId) {
  const fetchParams = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return fetch(`${baseUrl}/${worldId}/${entityPlural}/${entityId}`, fetchParams)
}

export function update_char_items(token, worldId, charId, items) {
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ itemsOwned: items })
  }
  return fetch(`${baseUrl}/${worldId}/characters/${charId}/itemsOwned`, fetchParams)
}

export function update_char_groups(token, worldId, charId, groups) {
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ groups })
  }
  return fetch(`${baseUrl}/${worldId}/characters/${charId}/groups`, fetchParams)
}

export function update_char_events(token, worldId, charId, events) {
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ events })
  }
  return fetch(`${baseUrl}/${worldId}/characters/${charId}/eventsParticipated`, fetchParams)
}


export function add_relationship(token, worldId, charId, payload) {
  const fetchParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }
  return fetch(`${baseUrl}/${worldId}/characters/${charId}/relationships`, fetchParams)
}

export function update_event_chars(token, worldId, eventId, characters) {
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ characters })
  }
  return fetch(`${baseUrl}/${worldId}/events/${eventId}/participatingCharacters`, fetchParams)
}

export function update_item_owners(token, worldId, itemId, characters) {
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ characters })
  }
  return fetch(`${baseUrl}/${worldId}/items/${itemId}/owners`, fetchParams)
}

export function update_group_members(token, worldId, groupId, characters) {
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ characters })
  }
  return fetch(`${baseUrl}/${worldId}/groups/${groupId}/members`, fetchParams)
}

export function edit_character(token, worldId, charId, payload) {
  payload = cleanFormData(payload)
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }
  return fetch(`${baseUrl}/${worldId}/characters/${charId}`, fetchParams)
}

export function edit_event(token, worldId, eventId, payload) {
  payload = cleanFormData(payload)
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }
  return fetch(`${baseUrl}/${worldId}/events/${eventId}`, fetchParams)
}

export function edit_location(token, worldId, locationId, payload) {
  payload = cleanFormData(payload)
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }
  return fetch(`${baseUrl}/${worldId}/locations/${locationId}`, fetchParams)
}


export function edit_group(token, worldId, groupId, payload) {
  payload = cleanFormData(payload)
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }
  return fetch(`${baseUrl}/${worldId}/groups/${groupId}`, fetchParams)
}

export function edit_item(token, worldId, itemId, payload) {
  payload = cleanFormData(payload)
  const fetchParams = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }
  return fetch(`${baseUrl}/${worldId}/items/${itemId}`, fetchParams)
}

