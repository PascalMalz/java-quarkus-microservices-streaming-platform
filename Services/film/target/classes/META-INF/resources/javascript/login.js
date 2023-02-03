"use strict";

/**
 * Benutzer ausloggen, Cookie löschen und zum Login-MS weiterleiten.
 */
function logout() {
  deleteCookie();
  console.log("User ausgeloggt");

  // Anwender zum Login-MS überführen
  window.location.href = "http://localhost:8081/";
}

/**
 * Löscht das Cookie durch Setzen eines eines bereits passierten Ablaufdatums.
 */
function deleteCookie() {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/**
 * Ermittelt den Wert für den übergebenen Parameter aus dem Cookie.
 *
 * @param parameter - gesuchter Parameter
 * @returns {string} - Wert des gesuchten Parameter
 */
function getCookie(parameter) {
  let paramName = parameter + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let allParameters = decodedCookie.split(";");

  for (let i = 0; i < allParameters.length; i++) {
    let currentParam = allParameters[i];
    while (currentParam.charAt(0) === " ") {
      currentParam = currentParam.substring(1);
    }
    if (currentParam.indexOf(paramName) === 0) {
      return currentParam.substring(paramName.length, currentParam.length);
    }
  }
  return "";
}

/**
 * Überprüfe den Anmeldestatus des Benutzers.
 * Suchen der User-ID im Cookie der Seite.
 * Wenn dieser nicht eingeloggt ist, wird der Nutzer zum Login-MS weitergeleitet.
 */
function checkLoginState() {
  let userId = getCookie("user");

  if (userId === "") {
    console.log("User nicht eingeloggt!");

    // Anwender zum Login-MS überführen
    window.location.href = "http://localhost:8081/";
  } else {
    console.log("User eingeloggt!");
  }
}

// Bei jedem Seitenaufruf wird der Anmeldestatus des Benutzers überprüft
checkLoginState();
