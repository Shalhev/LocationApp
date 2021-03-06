import { locService } from './loc.service.js';

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getGmap,
    searchMap
}

const API_KEY = 'AIzaSyCmdCuUqT27CzFjXShBAtWxPPMsoTIsm4k';
var gMap;


function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    locService.saveLoc(loc)
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getGmap() {
    return gMap
}

function searchMap(searchWords) {
    const searchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchWords}&key=${API_KEY}`
    return axios.get(searchUrl)
        .then(res => res.data)
        .then(data => data.results[0].geometry.location) //{lat,lng}
        .catch(() => { throw new Error('couldnt find location') })
}
