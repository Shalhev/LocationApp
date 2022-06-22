'use strict'
const MAP_KEY = 'placesDB'
const USER_KEY = 'settingsDB'

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}