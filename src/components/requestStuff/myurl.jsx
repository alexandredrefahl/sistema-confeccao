var protocol = window.location.protocol;
var host = window.location.host;
var rootUrl = protocol + '//' + host;
let minnhaURLChecada = '';

if (rootUrl == 'http://localhost:5173') {
  minnhaURLChecada = 'http://127.0.0.1:8080/';
} else {
  minnhaURLChecada = rootUrl + '/';
}

export const myurl = minnhaURLChecada;
