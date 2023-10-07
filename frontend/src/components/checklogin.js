export let userID = "EMPTY"
export let result = false;

export async function checkLogin() {
    const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + userID;

    
    result = await fetch(url).then(response => response.json()).then(json => {
        if ("error" in json) {
            window.alert("You must sign in with a google account first!")
            console.log("User is NOT signed in!")
            return false
        }
        else {
            console.log("User is signed in!")
            return true;
        }
    })
    return result
}

export function setUserID(userid) {
    userID = userid
}