import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.renderLocs = renderLocs;
window.onGetUserPos = onGetUserPos;
window.onGoToLoc = onGoToLoc;
window.onDeleteLoc = onDeleteLoc;
window.onSetUserLocation = onSetUserLocation;
window.onSearchLoc = onSearchLoc;
window.onCopyLoc = onCopyLoc;

function onInit() {
    mapService.initMap()
        .then(() => {
            mapService.getGmap().addListener('click', (e) => {
                onAddMarker(e.latLng)
            })
            console.log('Map is ready');
            renderFilterByQueryStringParams()
            renderLocs()
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(pos) {
    console.log('Adding a marker');
    mapService.addMarker(pos)
    renderUrlAdress(pos)
    renderLocs()
}

function renderLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            renderTable()
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function renderTable() {
    locService.getLocs()
        .then(locs => {
            const strHtmls = locs.map(loc =>
                `<tr>
            <td>${loc.id}</td>
            <td>${loc.name}</td>
            <td>${loc.createdAt}</td>
            <td>${loc.lat}, ${loc.lng}</td>
            <td>
            <button onclick="onGoToLoc(${loc.lat},${loc.lng})">Go</button>
            <button onclick="onDeleteLoc('${loc.id}')">Delete</button>
            </td>
        </tr>`
            )
            document.querySelector('.locations tbody').innerHTML = strHtmls.join('')
        })
        .catch(() => { throw new Error('couldnt render locations') })
}

function onGoToLoc(lat, lng) {
    mapService.panTo(lat, lng)
}

function onDeleteLoc(id) {
    locService.deleteLoc(id)
    renderTable()
}

function onSetUserLocation() {
    console.log('setting user location...')
    const userPos = mapService.setUserLocation()
    document.querySelector('.user-pos').innerText = userPos
}

function onSearchLoc(ev) {
    ev.preventDefault()
    console.log(`searching ${searchWords}...`);

    var searchWords = document.querySelector('input[type=search]').value;
    mapService.searchMap(searchWords)
        .then(loc => mapService.panTo(loc.lat, loc.lng))
}

function renderUrlAdress(pos) {
    const queryStringParams = `?lat=${pos.lat()}&lng=${pos.lng()}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onCopyLoc() {
    const url = window.location.href;
    const copy_text_val = document.querySelector('.copy_text');
    copy_text_val.value = url;

    copy_text_val.select();
    document.execCommand("copy");
    console.log(copy_text_val.value);
}


function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)


    const loc = {
        lat: +queryStringParams.get('lat'),
        lng: +queryStringParams.get('lng')
    }

    if (!loc.lat && !lac.lng) return

    mapService.panTo(loc.lat, loc.lng)
}