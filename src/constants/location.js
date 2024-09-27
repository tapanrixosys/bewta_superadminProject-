const LOCATION = {
    location : localStorage.getItem('calenderLocation') ? JSON.parse(localStorage.getItem('calenderLocation').name) : 'Lahore',
    locationId: localStorage.getItem('calenderLocation') ? JSON.parse(localStorage.getItem('calenderLocation').locationId) : 29
}

export { 
    LOCATION
}