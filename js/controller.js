'use strict'

function initMap() {
  console.log('loading map...')
  const eilat = { lat: 29.558391344294172, lng: 34.95139125400449 }
  gMap = new google.maps.Map(document.getElementById('map'), {
    center: eilat,
    zoom: 12,
  })
  const marker = new google.maps.Marker({
    position: eilat,
    map: gMap,
  })

  gMap.addListener('click', (e) => {
    onSaveLocation(e.latLng)
  })
  renderMarkers()
}

//////////////////////general
function onGoToMap() {
  window.location = 'map.html'
}

function onGoToSettings() {
  window.location = 'user.html'
}

function onGoToMenu() {
  window.location = 'index.html'
}
////////////////////////map
function oninitMap() {
  let places = getPlaces()
  renderPlaces(places)
}

function onSetUserLocation() {
  console.log('setting user location...')
  setUserLocation()
}

function onSaveLocation(location) {
  // LINK TO DOCUMENTATION  - https://developers.google.com/maps/documentation/javascript/events
  //   console.log('location', location)
  //   console.log(location.toJSON())
  let placeName = prompt('enter a name for this location')
  if (!placeName) placeName = `a place i watched on ${getCurrDate()}`
  const position = { lat: location.lat(), lng: location.lng() }
  //   console.log('position', position)
  const place = createPlace(placeName, location)
  addPlace(place)
  addMarker(place)
  renderPlaces(gPlaces)
}

function renderPlaces(places) {
  const strHtmls = places.map(
    (place) =>
      `<li class="list-group-item bg-primary text-white m-1">
        <button class="btn btn-sm btn-danger"onclick="onDeletePlace('${place.id}')">
        X
        </button>
        ${place.name}
        <button class="btn btn-sm btn-outline-warning" onclick="onShowPlace('${place.id}')">
        Show
        </button>
     </li>`
  )

  const elPlaceList = document.querySelector('.place-list')
  elPlaceList.innerHTML = strHtmls.join('')
}

function onDeletePlace(placeId) {
  deletePlace(placeId)
  renderPlaces(gPlaces)
}

function onShowPlace(placeId) {
  showPlace(placeId)
}

function onDownloadPlaces(elLink) {
  const csvContent = getPlacesAsCSV()
  elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}

//////////////////settings

function setAge(value) {
  document.querySelector('.user-age').innerText = value
}

function onSetSettings(ev, val) {
  ev.preventDefault()
  var email = document.getElementById('email').value
  var age = document.getElementById('age').value
  var backgroundColor = document.getElementById('bgc').value
  var textColor = document.getElementById('tc').value
  var dateOfBirth = document.getElementById('birth-date').value
  var timeOfBirth = document.getElementById('birth-time').value

  var userData = {
    email,
    age,
    backgroundColor,
    textColor,
    dateOfBirth,
    timeOfBirth,
  }
  saveUserData(userData)
  renderThemeFromStorage()
}

function renderThemeFromStorage() {
  const userData = loadUserData() ? loadUserData() : ''
  const backgroundColor = userData.backgroundColor
    ? userData.backgroundColor
    : '#47B5FF'
  const textColor = userData.textColor ? userData.textColor : '#413F42'

  document.querySelector('body').style.color = textColor
  document.querySelector('body').style.backgroundColor = backgroundColor
}

function renderBDCountDown() {
  const userData = loadUserData() ? loadUserData() : ''
  if (
    !userData ||
    !userData.age ||
    !userData.dateOfBirth ||
    !userData.timeOfBirth
  )
    return
  const hoursLeft = calcHoursToBday(userData)

  document.querySelector('.hours-to-Bday').innerText = hoursLeft
}
