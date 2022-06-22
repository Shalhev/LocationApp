'use strict'

function makeId(length = 2) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getCurrDate() {
    const today = new Date();
    return today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
}