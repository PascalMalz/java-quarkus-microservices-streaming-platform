"use strict";

/*Wenn beide Eingabefelder gefüllt sind, überprüfe die Eingabedaten*/
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email !== "" && password !== "") {
    validateLogin(email, password);
  } else {
    console.log("Email oder Passwort nicht ausgefüllt");
    alert("Gib deine E-Mail-Adresse und dein Passwort ein!");
  }
}

/*Führt die Login-Funktion aus, wenn Enter gedrückt wird*/
function loginViaEnter(e) {
  if (!e) e = window.Event;
  if (e.keyCode == "13") {
    login();
  }
}

/*Überprüfe die Eingaben nach nach einer Übereinstimmung in der users.xml.
Wenn eine Übereinstimmung gefunden wird, wird der Benutzer eingeloggt.
Sonst wird eine entsprechende Fehlermeldung ausgegeben.*/
function validateLogin(email, password) {
  let validUser;

  String.prototype.hashCode = function () {
    let char = undefined;
    let hash;
    if (this.length == 0) return hash;
    for (var i = 0; i < this.length; i++) {
      char = this.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  var hashedpw = password.hashCode();

  $.ajax({
    type: "POST",
    url: "/login",
    data: JSON.stringify({
      email: email,
      password: hashedpw,
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      validUser = data;
      if (validUser === null || validUser === undefined) {
        alert("Benutzer nicht gefunden!");
      } else {
        setCookie(validUser);
        window.location.href = "http://localhost:8080/";
      }
    },
  });
}

function setCookie(userID) {
  let date = new Date();

  //expire in 60 days
  date.setTime(date.getTime() + 60 * 24 * 60 * 60 * 1000);

  let expires = "expires=" + date.toUTCString();

  document.cookie = "user=" + userID + ";" + expires + ";path=/";
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

/*Überprüfe den Anmeldestatus des Benutzers.
Zuerst wird im Local Storage nach Anmeldedaten gesucht (falls dieser vom Browser unterstützt wird).
Wenn dieser eingeloggt ist, wird das Login-Pop-up geschlossen und der Benutzer gelangt zur Startseite. Sonst öffnet sich das Login-Fenster.*/
function checkLoginState() {
  console.log("checking login state");

  let userId = getCookie("user");

  if (userId === "") {
    console.log("User nicht eingeloggt");
  } else {
    console.log("User eingeloggt");
    window.location.href = "http://localhost:8080/";
  }
}
let userField = document.getElementById("email");
userField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Standardaktion abbrechen
    event.preventDefault();
    document.getElementById("loginButton").click();
  }
});
let passwordField = document.getElementById("password");
passwordField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Standardaktion abbrechen
    event.preventDefault();
    document.getElementById("loginButton").click();
  }
});

//Bei jedem Seitenaufruf wird der Anmeldestatus des Benutzers überprüft
checkLoginState();
