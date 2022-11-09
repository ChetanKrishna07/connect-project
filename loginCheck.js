if(!sessionStorage.getItem('uname')) {
    window.location.href = "login.html"
}

function logout() {
    sessionStorage.clear()
}