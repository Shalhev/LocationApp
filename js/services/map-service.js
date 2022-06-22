'use strict'
let gMap
let gPlaces = loadFromStorage(MAP_KEY) ? loadFromStorage(MAP_KEY) : []
let gMarkers = []

function getPlaces() {
  return gPlaces
}

function renderMarkers() {
  gPlaces.forEach(addMarker)
  //   gPlaces.forEach((pos) => {
  //     console.log('pos', pos)
  //     addMarker(pos)
  //   })
}

function addPlace(place) {
  gPlaces.push(place)
  saveToStorage(MAP_KEY, gPlaces)
}

function addMarker({ location, id, name }) {
  console.log('location, id, name', location, id, name)
  const marker = new google.maps.Marker({
    position: location,
    map: gMap,
    id,
    title: name,
  })
  gMarkers.push(marker)
}

function setUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(centerMapOnUser)
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}

function centerMapOnUser(position) {
  const center = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }

  console.log('Centering on', center)
  gMap.setCenter(center)
}

function createPlace(name, location) {
  return {
    id: makeId(),
    name,
    location,
  }
}

function deletePlace(placeId) {
  gPlaces = gPlaces.filter((place) => place.id !== placeId)
  removeMarker(placeId)
  saveToStorage(MAP_KEY, gPlaces)
}

function removeMarker(id) {
  let markerIdx = gMarkers.findIndex((marker) => marker.id === id)
  const marker = gMarkers[markerIdx]
  //   console.log('marker, markerIdx', marker, markerIdx)
  gMarkers.splice(markerIdx, 1)
  marker.setMap(null)
  //   gMarkers.splice(markerIdx, 1)[0].setMap(null)
}

function showPlace(placeId) {
  const place = gPlaces.find((place) => place.id === placeId)
  if (place) gMap.setCenter(place.location)
}

function getPlacesAsCSV() {
  let csvStr = `Id, Name, Location,`

  gPlaces.forEach((place) => {
    const csvLine = `\n${place.id}, ${place.name}, ${JSON.stringify(
      place.location
    )}`
    csvStr += csvLine
  })

  return csvStr
}
