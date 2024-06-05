const tokenName = 'user-token'

export function setToken(token) {
    localStorage.setItem(tokenName, token)
}

export function storeUsername(username) {
    localStorage.setItem('username', username)
}
export function getUsername() {
    return localStorage.getItem('username')
}

export function removeUsername() {
    localStorage.removeItem('username')
}

export function getToken() {
    return localStorage.getItem(tokenName)
}

export function removeToken() {
    localStorage.removeItem(tokenName)
}

export function isLoggedIn() {
    const token = getToken()
    if (!token) return false

    const payloadStr = token.split('.')[1]
    const payloadObj = JSON.parse(atob(payloadStr))
    console.log(payloadObj)

    if (payloadObj.exp > Date.now() / 1000) {
        return true
    } else {
        return false
    }
}

export function timeAgo(created_at) {
    const date = new Date(created_at)

    const seconds = Math.floor((new Date() - date) / 1000);

    const interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    if (interval === 1) {
        return interval + " year ago";
    }

    const months = Math.floor(seconds / 2628000);
    if (months > 1) {
        return months + " months ago";
    }
    if (months === 1) {
        return months + " month ago";
    }

    const days = Math.floor(seconds / 86400);
    if (days > 1) {
        return days + " days ago";
    }
    if (days === 1) {
        return days + " day ago";
    }

    const hours = Math.floor(seconds / 3600);
    if (hours > 1) {
        return hours + " hours ago";
    }
    if (hours === 1) {
        return hours + " hour ago";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes > 1) {
        return minutes + " minutes ago";
    }
    if (minutes === 1) {
        return minutes + " minute ago";
    }

    return "just now";
}


export function resizeImage(image) {

}