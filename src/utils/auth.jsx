export const isAuthenticated = () => {
    if (localStorage.getItem('accessToken') == null) {
        return false
    }
    let hourExpiration = parseHourJava();
    if (hourExpiration < new Date().getTime()) {

        return false
    }
    return true
}

export const whatsRole = () => {
    if (localStorage.getItem('role') === 'ADM') {
        return true;
    }
    return false;
}


function parseHourJava() {
    let data = new Date()
    let hour = localStorage.expiration.slice(11, 19);
    let min = localStorage.expiration.slice(14, 16);
    let sec = localStorage.expiration.slice(17, 19);
    return data.setHours(parseInt(hour), parseInt(min), parseInt(sec))
}