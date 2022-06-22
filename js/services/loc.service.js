import { storageService } from './storage.service.js'
export const locService = {
    getLocs,
    saveLoc
}
const STORAGE_KEY = 'locsDB';
var gId = 1;


const locs = storageService.loadFromStorage(STORAGE_KEY) || [
    { id: 0, name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: new Date },
    { id: 1, name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: new Date }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function saveLoc(loc) {
    const location = {
        id: ++gId,
        name: 'place',
        lat: loc.lat(),
        lng: loc.lng(),
        createdAt: new Date
    }
    locs.push(location);
    storageService.saveToStorage(STORAGE_KEY, locs)
    console.log(locs);
}