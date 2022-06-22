import { storageService } from './storage.service.js'
export const locService = {
    getLocs,
    saveLoc,
    deleteLoc,
}
const STORAGE_KEY = 'locsDB';
const API_KEY = 'AIzaSyCmdCuUqT27CzFjXShBAtWxPPMsoTIsm4k';


const locs = storageService.loadFromStorage(STORAGE_KEY) || [
    { id: _makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: new Date },
    { id: _makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: new Date }
]


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function saveLoc(loc) {
    getLocName(loc)
        .then(name => {
            const location = {
                id: _makeId(),
                name: name,
                lat: loc.lat(),
                lng: loc.lng(),
                createdAt: new Date
            }
            locs.push(location);
            storageService.saveToStorage(STORAGE_KEY, locs)
        })
}

function deleteLoc(placeId) {
    const idx = locs.findIndex(loc => loc.id === placeId)
    locs.splice(idx, 1)
    storageService.saveToStorage(STORAGE_KEY, locs)
}

function getLocName(loc) {
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${loc.lat()},${loc.lng()}&key=${API_KEY}`
    return axios.get(searchUrl)
        .then(res => res.data)
        .then(data => data.results[0].formatted_address)
}



///utis
function _makeId(length = 3) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}