import { storageService } from './storage.service.js'
export const locService = {
    getLocs,
    saveLoc,
    deleteLoc
}
const STORAGE_KEY = 'locsDB';


const locs = storageService.loadFromStorage(STORAGE_KEY) || [
    { id: _makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: new Date },
    { id: _makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: new Date }
]

function getLocs() {
    return Promise.resolve(locs)
}

function saveLoc(loc) {
    const location = {
        id: _makeId(),
        name: 'place',
        lat: loc.lat(),
        lng: loc.lng(),
        createdAt: new Date
    }
    locs.push(location);
    storageService.saveToStorage(STORAGE_KEY, locs)
    console.log(locs);
}

function deleteLoc(placeId) {
    const idx = locs.findIndex(loc => loc.id === placeId)
    locs.splice(idx, 1)
    storageService.saveToStorage(STORAGE_KEY, locs)
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