
window.interopFunctions = {
    saveToken: function (token) {
        window.localStorage.setItem('jwt', token);
        console.log("Authentication token has been stored.");
        return true;
    },
    getStoredToken: function () {
        var token = window.localStorage.getItem('jwt');
        console.log(token ? "Authentication token read from storage."+token+")" : "No authentication token found in storage.");
        return token;
    },
    deleteStoredToken: function () {
        window.localStorage.removeItem('jwt');
        console.log("Authentication token has been deleted.");
        return true;
    },
    showRawHtml: function (elementId, html) {
        var el = document.getElementById(elementId);
        el.innerHTML = html;
        return true;
    },
    logToJavascript: function (log) {
        console.log(log);
        return true;
    }

};

