'use strict'
function saveUserData(data) {
    saveToStorage(USER_KEY, data)
}

function loadUserData() {
    return loadFromStorage(USER_KEY);
}

function calcHoursToBday(userData) {
    const MS_IN_HOUR = 3600000;

    const userAge = +userData.age;
    const bDStr = userData.dateOfBirth + ' ' + userData.timeOfBirth;
    const bDayTimeStamp = _toNextBdayTimestamp(bDStr, userAge);
    const currTime = Date.now();

    const hoursLeft = Math.ceil((bDayTimeStamp - currTime) / MS_IN_HOUR)
    return hoursLeft;
}

function _toNextBdayTimestamp(strDate, age) {
    const MS_IN_YEAR = 31556952000;

    var datum = Date.parse(strDate);
    return datum + (age + 1) * MS_IN_YEAR;
}