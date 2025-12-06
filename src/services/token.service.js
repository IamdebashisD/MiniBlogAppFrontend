const ACCESS_KEY= 'access_token';
const REFRESH_KEY= 'refresh_token';
const USER_KEY= 'user'; // Optional to store user info


export function setAccessToken(token){
    localStorage.setItem(ACCESS_KEY, token)
}

export function getAccessToken(){
    return localStorage.getItem(ACCESS_KEY)
}

export function setRefreshToken(token){
    localStorage.setItem(REFRESH_KEY, token)
}

export function getRefreshToken(){
    return localStorage.getItem(REFRESH_KEY)
}

export function setUser(userObj){
    localStorage.setItem(USER_KEY, JSON.stringify(userObj))
}

export function getUser(){
    const v = localStorage.getItem(USER_KEY)
    return v ? JSON.parse(v) : null
}

export function clearTokens(){
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
}
