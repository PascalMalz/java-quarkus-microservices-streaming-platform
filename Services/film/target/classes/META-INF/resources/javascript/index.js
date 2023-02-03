"use strict";

// Beim Laden der Seite prüfen, welcher Hash in der URL steht und welche Seite aufzurufen ist
if (window.location.hash.includes("#favoriten")) {
  showFavouriteList(true);
} else if (window.location.hash.includes("#home")) {
  loadStartScreen();
} else if (window.location.hash.includes("#player")) {
  loadPlayer(window.location.hash.replace("#player_", "").split("_").join(" "));
} else if (window.location.hash.includes("#search")) {
  searchMovie(
    window.location.hash.replace("#search_", "").split("_").join(" "),
    true
  );
} else {
  window.location.hash = "home";
}

// Prüfen, ob der Hash in der URL verändert wird und die entsprechende Seite aufrufen
// Dadurch wird der Return-Button im Browser nutzbar
window.onhashchange = function () {
  if (window.location.hash.includes("#favoriten")) {
    showFavouriteList(true);
  } else if (window.location.hash.includes("#home")) {
    loadStartScreen();
  } else if (window.location.hash.includes("#player")) {
    loadPlayer(
      window.location.hash.replace("#player_", "").split("_").join(" ")
    );
  } else if (window.location.hash.includes("#search")) {
    searchMovie(
      window.location.hash.replace("#search_", "").split("_").join(" "),
      true
    );
  }
};

/**
 * Wechselt das Menü für eine reponsive Bedienung der Webseite.
 */
function toggleMenu() {
  let x = document.getElementById("header");
  if (x.className === "") {
    x.className = "responsive";
    console.log("Responsive Menü wird eingeblendet");
  } else {
    x.className = "";
    console.log("Responsive Menü wird ausgeblendet");
  }
}

// Suchfeld zurücksetzen
document.getElementById("searchField").value = "";
// Hilfsvariable für das Nichtfinden von Treffern
let alreadyNoMatches = false;
// Hilfsvariable für den letzten Suchparameter
let lastSearchParameter;

/**
 * Initiert die dynamische Suche von Filmen anhand des Filmtitels.
 */
function dynamicSearch() {
  let searchInput = document.getElementById("searchField").value.trim();
  if (searchInput === "") {
    loadStartScreen();
  } else {
    console.log("User sucht nach " + searchInput);

    if (location.hash.includes("#search")) {
      location.replace("#search_" + searchInput.split(" ").join("_"));
    } else {
      location.hash = "search_" + searchInput.split(" ").join("_");
    }

    // Starte Suche mit der Usereingabe
    searchMovie(searchInput, true);
  }
}

let searchField = document.getElementById("searchField");
searchField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    // Standardaktion abbrechen
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

/**
 * Führt die Suche mit den entsprechenden Parametern aus.
 *
 * @param movieTitleParameters - Suchparameter für Filmtitel
 * @param isASCSorted - Soll das Suchergebnis aufsteigend sortiert sein?
 */
function searchMovie(movieTitleParameters, isASCSorted) {
  // REST-Suchrequest an den Film-Microservice
  let searchRequest = new XMLHttpRequest();

  // HTML-Injection verhindern
  movieTitleParameters = movieTitleParameters
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Fehlermeldung für den AJAX-Aufruf
  searchRequest.addEventListener("error", function () {
    // Snackbar mit Fehlermeldung anzeigen
    showSnackbar("Laden der Filme ist fehlgeschlagen.");
    // Startseite laden
    loadStartScreen();
  });

  searchRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // alle Filme mit den passenden Titeln
      let filmList = JSON.parse(searchRequest.responseText);

      if (filmList.length === 0) {
        // Wenn keine Treffer gefunden wurden
        if (alreadyNoMatches) {
          // Wenn bereits bei vorheriger Eingabe keine Treffer gefunden wurden
          // Ändern des angezeigten Suchparameters
          updateSearchParameter(movieTitleParameters);
        } else {
          // Keine Treffer Seite initialisieren
          initNoMatches(movieTitleParameters);
          alreadyNoMatches = true;
        }
      } else {
        // Wenn Treffer gefunden wurden
        alreadyNoMatches = false;
        lastSearchParameter = movieTitleParameters;

        // alle Resultate in der HTML-Seite anzeigen

        let listHead;
        let headTitle = 'Suchergebnisse für "' + movieTitleParameters + '"';
        if (isASCSorted) {
          // Wenn die Liste aufsteigend sortiert werden soll, aufsteigend sortieren
          sortMoviesASC(filmList);
          // Kopf der Liste initialisieren
          listHead = initListHead(true, headTitle);
        } else {
          // Wenn die Liste absteigend sortiert werden soll, absteigend sortieren
          sortMoviesDESC(filmList);
          // Kopf der Liste initialisieren
          listHead = initListHead(false, headTitle);
        }

        // Alle Treffer in einer Liste anzeigen
        showMovies(initList(filmList, true), listHead);

        // Infos aller Filme laden und anzeigen
        loadMovieInfo(filmList);
      }
    }
    // TODO: Andere Statuscodes bei den Requests abfangen (z. B. 500 etc.)
  };

  searchRequest.open(
    "GET",
    "http://localhost:8080/film/title/" + movieTitleParameters,
    true
  );
  searchRequest.send();
}

/**
 * Liste mit allen Filmen initialisieren, sowohl für Suchergebnisse als auch für Favoriten.
 *
 * @param filmList - Liste der Filme im JSON-Format
 * @param isSearchResult - handelt es sich um ein Suchergebnis?
 * @returns {HTMLDivElement} - HTML-Element mit der Liste der Filme
 */
function initList(filmList, isSearchResult) {
  // HTML-Gerüst der Liste initialisieren
  let listDiv = document.createElement("div");
  listDiv.classList.add("liste");
  listDiv.classList.add("fade");

  for (let i = 0; i < filmList.length; i++) {
    let carouselVertical = document.createElement("div");
    carouselVertical.classList.add("carouselVertical");
    let carouselElement = document.createElement("div");
    carouselElement.classList.add("carouselVerticalElement");
    carouselElement.addEventListener("mouseover", function () {
      showPrevInfo(carouselElement);
    });
    carouselElement.addEventListener("mouseout", function () {
      hidePrevInfo(carouselElement);
    });
    carouselElement.addEventListener("click", function () {
      // Player mit dem aktuellen Film laden
      loadPlayer(filmList[i].id);
    });

    let carouselPreviewBackground = document.createElement("div");
    carouselPreviewBackground.classList.add(
      "carouselVerticalPreviewBackground"
    );

    let carouselPreviewText = document.createElement("div");
    carouselPreviewText.classList.add("carouselPreviewText");

    let carouselPreviewTextHead = document.createElement("span");
    carouselPreviewTextHead.classList.add("carouselPreviewTextHead");
    carouselPreviewTextHead.innerHTML = filmList[i].title;
    let carouselPreviewTextBody = document.createElement("div");
    carouselPreviewTextBody.classList.add("carouselPreviewTextBody");
    carouselPreviewTextBody.classList.add("far");
    carouselPreviewTextBody.classList.add("fa-play-circle");

    carouselPreviewText.appendChild(carouselPreviewTextHead);
    carouselPreviewText.appendChild(carouselPreviewTextBody);

    if (isSearchResult) {
      // Wenn die Liste ein Suchergebnis ist
      let carouselPreviewTextFooter = document.createElement("div");
      carouselPreviewTextFooter.classList.add("carouselPreviewTextFooter");

      let filmId = filmList[i].id;
      if (isFavourite(filmId)) {
        // Wenn der aktuellen Film als Favorit markiert ist
        carouselPreviewTextFooter.classList.add("fas");
        carouselPreviewTextFooter.classList.add("fa-heart");
      } else {
        // Wenn der aktuelle Film nicht als Favorit markiert ist
        carouselPreviewTextFooter.classList.add("far");
        carouselPreviewTextFooter.classList.add("fa-heart");
      }

      carouselPreviewTextFooter.addEventListener("click", function (e) {
        // Aufsteigen des Events verhindern
        e.stopPropagation();
        // Film als Favorit hinzufügen oder entfernen
        manageFavourite(carouselPreviewTextFooter, filmId);
      });

      carouselPreviewText.appendChild(carouselPreviewTextFooter);
    }

    carouselPreviewBackground.appendChild(carouselPreviewText);

    let imgElement = document.createElement("img");
    imgElement.classList.add("carouselImage");
    imgElement.setAttribute("src", "pictures/" + filmList[i].id + ".jpg");
    imgElement.setAttribute("draggable", "false");

    carouselElement.appendChild(carouselPreviewBackground);
    carouselElement.appendChild(imgElement);
    carouselVertical.appendChild(carouselElement);

    let carouselVerticalInfoBox = document.createElement("div");
    carouselVerticalInfoBox.classList.add("carouselVerticalInfoBox");

    let carouselVerticalInfoBoxInner = document.createElement("div");
    carouselVerticalInfoBoxInner.classList.add("carouselVerticalInfoBoxInner");

    let carouselVerticalInfoTitle = document.createElement("div");
    carouselVerticalInfoTitle.classList.add("carouselVerticalInfoTitle");
    carouselVerticalInfoTitle.innerHTML = filmList[i].title;
    let carouselVerticalInfoDescription = document.createElement("div");
    carouselVerticalInfoDescription.classList.add(
      "carouselVerticalInfoDescription"
    );
    carouselVerticalInfoDescription.id = filmList[i].title + "_description";
    let carouselVerticalInfoTimeBox = document.createElement("div");
    carouselVerticalInfoTimeBox.classList.add("carouselVerticalInfoTimeBox");
    let carouselVerticalInfoTime = document.createElement("div");
    carouselVerticalInfoTime.classList.add("carouselVerticalInfoTime");
    carouselVerticalInfoTime.id = filmList[i].title + "_time";
    carouselVerticalInfoTimeBox.appendChild(carouselVerticalInfoTime);
    let carouselVerticalControlBox = document.createElement("div");
    carouselVerticalControlBox.classList.add("carouselVerticalControlBox");

    let carouselVerticalControlPlay = document.createElement("div");
    carouselVerticalControlPlay.classList.add("carouselVerticalControl");
    carouselVerticalControlPlay.classList.add("carouselVerticalControlPlay");
    carouselVerticalControlPlay.innerHTML = "Ansehen";
    carouselVerticalControlPlay.addEventListener("click", function () {
      // Player mit den aktuellen Film laden
      loadPlayer(filmList[i].id);
    });
    carouselVerticalControlBox.appendChild(carouselVerticalControlPlay);

    if (!isSearchResult) {
      // Wenn die Liste kein Suchergebnis ist, dann den Entfernen Button hinzufügen
      let carouselVerticalControlDelete = document.createElement("div");
      carouselVerticalControlDelete.classList.add("carouselVerticalControl");
      carouselVerticalControlDelete.classList.add(
        "carouselVerticalControlDelete"
      );
      carouselVerticalControlDelete.innerHTML = "Entfernen";
      carouselVerticalControlDelete.addEventListener("click", function () {
        // aktuellen Film aus den Favoriten entfernen
        removeFavourite(filmList[i].id, getCookie("user"), false);
        console.log("after removeFavourite");
        if (filmList.length > 1) {
          // Wenn der Benutzer noch Filme als Favoriten hat
          if (
            document.getElementsByClassName(
              "carouselVerticalSortButtonActiv"
            )[0].innerHTML === "Aufsteigend"
          ) {
            // Wenn aufsteigend sortiert wurde die Favoritenliste aufsteigend sortiert neu laden
            showFavouriteList(true);
          } else {
            // Wenn absteigend sortiert wurde die Favoritenliste absteigend sortiert neu laden
            showFavouriteList(false);
          }
        } else {
          // Wenn keine Favoriten mehr vorhanden sind, die Startseite laden
          loadStartScreen();
        }
      });
      carouselVerticalControlBox.appendChild(carouselVerticalControlDelete);
    }

    carouselVerticalInfoBoxInner.appendChild(carouselVerticalInfoTitle);
    carouselVerticalInfoBoxInner.appendChild(carouselVerticalInfoDescription);
    carouselVerticalInfoBox.appendChild(carouselVerticalInfoBoxInner);
    carouselVerticalInfoBox.appendChild(carouselVerticalInfoTimeBox);
    carouselVerticalInfoBox.appendChild(carouselVerticalControlBox);

    carouselVertical.appendChild(carouselVerticalInfoBox);

    listDiv.appendChild(carouselVertical);

    let carouselVerticalHorizontalLine = document.createElement("div");
    carouselVerticalHorizontalLine.classList.add(
      "carouselVerticalHorizontalLine"
    );
    listDiv.appendChild(carouselVerticalHorizontalLine);
  }

  return listDiv;
}

/**
 * Initiert die Anzeige der Favoritenliste.
 *
 * @param isASCSorted - Liste aufsteigend sortieren?
 */
function showFavouriteList(isASCSorted) {
  // alle Filme aus der XML-Datei laden
  let favouriteRequest = new XMLHttpRequest();
  // Fehlermeldung für den AJAX-Aufruf
  favouriteRequest.addEventListener("error", function () {
    // Snackbar mit Fehlermeldung anzeigen
    showSnackbar("Laden der Filme ist fehlgeschlagen.");
    loadStartScreen();
  });

  favouriteRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let favouriteFilms = JSON.parse(favouriteRequest.responseText);

      if (favouriteFilms === undefined || favouriteFilms.length === 0) {
        showSnackbar("Du hast noch keine Filme als Favoriten markiert.");
      } else {
        window.location.hash = "favoriten";

        // show favourite movies in a list
        let listHead;

        if (isASCSorted) {
          // Wenn die Liste aufsteigend sortiert werden soll, dann aufsteigend sortieren
          sortMoviesASC(favouriteFilms);
          // Kopf der Liste initialisieren
          listHead = initListHead(true, "Meine Favoriten");
        } else {
          // Wenn die Liste absteigen sortiert werden soll, dann absteigend sortieren
          sortMoviesDESC(favouriteFilms);
          // Kopf der Liste initialisieren
          listHead = initListHead(false, "Meine Favoriten");
        }

        // Liste aller Favoriten anzeigen
        showMovies(initList(favouriteFilms, false), listHead);

        // Infos aller Filme laden und anzeigen
        loadMovieInfo(favouriteFilms);
      }
    }
  };

  favouriteRequest.open(
    "GET",
    "http://localhost:8080/favourite/all?userId=" + getCookie("user"),
    true
  );
  favouriteRequest.send();
}

/**
 * Hängt die Liste aller Filme ins HTML-Dokument an.
 *
 * @param filmList - HTML-Element der Liste an Filmen
 * @param listHead - HTML-Element für den Kopf der Filmliste
 */
function showMovies(filmList, listHead) {
  // alle Filme in der HTML-Seite anzeigen
  let mainDiv = document.getElementById("main");
  // alle Kinder der main divs entfernen
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  // Kopf der Liste und Liste aller Filme ans main div anhängen
  mainDiv.appendChild(listHead);
  mainDiv.appendChild(filmList);
}

/*Modal: Impressum, FAQ*/
function showModal(modalId) {
  let xmlReq = new XMLHttpRequest();
  xmlReq.overrideMimeType("text/html");
  xmlReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("modal").innerHTML = this.responseText;

      let modal = document.getElementById(modalId);
      modal.style.display = "block";

      console.log("Öffne " + modalId);
    }
  };
  xmlReq.open("GET", "modals/" + modalId + ".html", true);
  xmlReq.send();
}

function closeModal(modalId) {
  let modal = document.getElementById(modalId);
  modal.style.display = "none";
  console.log("Schließe " + modalId);
}

/**
 * Lädt die Informationen der Filme in der Liste in die HTML-Seite.
 *
 * @param filmList - Liste der Filme
 */
function loadMovieInfo(filmList) {
  for (let i = 0; i < filmList.length; i++) {
    let movieTitle = filmList[i].title;

    document.getElementById(movieTitle + "_description").innerHTML =
      filmList[i].description;
    document.getElementById(movieTitle + "_time").innerHTML =
      filmList[i].length;
  }
}

/**
 * Sortiert eine Liste von Filmen im JSON-Format aufsteigend anhand der Filmtitel.
 *
 * @param filmList - Liste der Filme
 */
function sortMoviesASC(filmList) {
  filmList.sort(function (a, b) {
    if (a.title === b.title) {
      return 0;
    } else if (a.title > b.title) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Sortiert eine Liste von Filmen im JSON-Format absteigend anhand der Filmtitel.
 *
 * @param filmList - Liste der Filme
 */
function sortMoviesDESC(filmList) {
  filmList.sort(function (a, b) {
    if (a.title === b.title) {
      return 0;
    } else if (a.title > b.title) {
      return -1;
    } else {
      return 1;
    }
  });
}

/**
 * Kopf der Liste initialisieren.
 *
 * @param isASCSorted - Soll die Liste aufsteigend sortiert sein?
 * @param title - Titel der Liste
 * @returns {HTMLDivElement} - HTML-Grundgerüst der Liste
 */
function initListHead(isASCSorted, title) {
  // HTML-Grundgerüst des Listenkopfes initialisieren
  let listHead = document.createElement("div");
  listHead.classList.add("carouselVerticalHeadBox");

  let carouselVerticalHead = document.createElement("div");
  carouselVerticalHead.classList.add("carouselVerticalHead");
  carouselVerticalHead.innerHTML = title;

  let carouselVerticalSort = document.createElement("div");
  carouselVerticalSort.classList.add("carouselVerticalSort");
  carouselVerticalSort.innerHTML = "Sortieren nach Titel:";

  // aufsteigend sortieren button initialisieren
  let carouselVerticalSortButtonActiv = document.createElement("div");
  carouselVerticalSortButtonActiv.classList.add("carouselVerticalControl");
  carouselVerticalSortButtonActiv.classList.add("carouselVerticalSortButton");
  carouselVerticalSortButtonActiv.innerHTML = "Aufsteigend";
  carouselVerticalSortButtonActiv.addEventListener("click", function () {
    if (
      document.getElementsByClassName("carouselVerticalControlDelete").length >
      0
    ) {
      // Wenn die Liste eine Favoritenliste ist, dann Favoritenliste aufsteigend sortiert neuladen
      showFavouriteList(true);
    } else {
      // Wenn die Liste ein Suchergebnis ist, dann Suchergebnis aufsteigend sortiert neuladen
      searchMovie(lastSearchParameter, true);
    }
  });

  // absteigend sortieren button initialisieren
  let carouselVerticalSortButton = document.createElement("div");
  carouselVerticalSortButton.classList.add("carouselVerticalControl");
  carouselVerticalSortButton.classList.add("carouselVerticalSortButton");
  carouselVerticalSortButton.innerHTML = "Absteigend";
  carouselVerticalSortButton.addEventListener("click", function () {
    if (
      document.getElementsByClassName("carouselVerticalControlDelete").length >
      0
    ) {
      // Wenn die Liste eine Favoritenliste ist, dann Favoritenliste absteigend sortiert neuladen
      showFavouriteList(false);
    } else {
      // Wenn die Liste ein Suchergebnis ist, dann Suchergebnis absteigend sortiert neuladen
      searchMovie(lastSearchParameter, false);
    }
  });

  if (isASCSorted) {
    // Wenn die Liste aufsteigend sortiert ist, dann wird der aufsteigend sortieren button als aktiv markiert
    carouselVerticalSortButtonActiv.classList.add(
      "carouselVerticalSortButtonActiv"
    );
  } else {
    // Wenn die Liste absteigend sortiert ist, dann wird der absteigend sortieren button als aktiv markiert
    carouselVerticalSortButton.classList.add("carouselVerticalSortButtonActiv");
  }

  carouselVerticalSort.appendChild(carouselVerticalSortButtonActiv);
  carouselVerticalSort.appendChild(carouselVerticalSortButton);

  listHead.appendChild(carouselVerticalHead);
  listHead.appendChild(carouselVerticalSort);

  // Kopf der Liste zurückgeben
  return listHead;
}

/**
 * Kein Suchergebnis gefunden Seite initialisieren.
 *
 * @param searchParameter - Suchparameter
 */
function initNoMatches(searchParameter) {
  let mainDiv = document.getElementById("main");
  // alle Kinder des main divs entfernen
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  // HTML-Grundgerüst der Seite initialisieren
  let listNoElementBox = document.createElement("div");
  listNoElementBox.classList.add("listNoElementBox");

  let listNoElementSmiley = document.createElement("div");
  listNoElementSmiley.classList.add("far");
  listNoElementSmiley.classList.add("fa-frown");
  listNoElementSmiley.classList.add("listNoElementSmiley");

  let listNoElementText = document.createElement("div");
  listNoElementText.classList.add("listNoElementText");
  listNoElementText.id = "title_div";
  listNoElementText.innerHTML =
    'Keine Ergebnisse für "' + searchParameter + '" gefunden';

  listNoElementBox.appendChild(listNoElementSmiley);
  listNoElementBox.appendChild(listNoElementText);

  let carouselVerticalHorizontalLine = document.createElement("div");
  carouselVerticalHorizontalLine.classList.add(
    "carouselVerticalHorizontalLine"
  );

  let listNoElementSuggestion = document.createElement("div");
  listNoElementSuggestion.classList.add("listNoElementSuggestion");
  listNoElementSuggestion.innerHTML = "Weitere Trailer:";

  let liste = document.createElement("div");
  liste.classList.add("liste");

  for (let i = 0; i < 2; i++) {
    let carouselHorizontal = document.createElement("div");
    carouselHorizontal.classList.add("carouselHorizontal");
    carouselHorizontal.id = "carousel" + (i + 1);
    liste.appendChild(carouselHorizontal);
  }

  mainDiv.appendChild(listNoElementBox);
  mainDiv.appendChild(carouselVerticalHorizontalLine);
  mainDiv.appendChild(listNoElementSuggestion);
  mainDiv.appendChild(liste);

  // Carousel der Seite initialisieren
  initCarousel();
}

/**
 * Ersetzt den alten angezeigten Suchparameter der kein Treffer Seite durch den neuen Parameter.
 *
 * @param searchParameter - Suchparameter
 */
function updateSearchParameter(searchParameter) {
  document.getElementById("title_div").innerHTML =
    'Keine Ergebnisse für "' + searchParameter + '" gefunden';
}

/**
 * Zeigt eine Snackbar am untere Bildschirmrand mit einer Nachricht
 *
 * @param message
 */
function showSnackbar(message) {
  let bar = document.getElementById("notificationBar");
  let snackbar = document.getElementById("snackbar");
  snackbar.innerHTML = message;
  bar.className = "show";

  console.log("Snackbar wird angezeigt: " + message);

  // Snackbar verschwindet wieder
  setTimeout(function () {
    bar.className = bar.className.replace("show", "");
  }, 3000);
}

/**
 * Prüft, ob der HTML5 Localstorage vom aktuellen Browser unterstützt und aktiviert ist.
 *
 * @returns {boolean} True, wenn unterstützt und aktiviert, false wenn nicht
 */
function supports_html5_storage() {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}

/**
 * Lädt die Startseite
 */
function loadStartScreen() {
  window.location.hash = "home";
  let mainDiv = document.getElementById("main");
  // alle Kinder des main divs entfernen
  while (mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.firstChild);
  }

  // HTML-Struktur der Carousels initialisieren
  let list = document.createElement("div");
  list.classList.add("liste");

  let carousel1 = document.createElement("div");
  carousel1.classList.add("carouselHorizontal");
  carousel1.id = "carousel1";
  list.appendChild(carousel1);

  let carousel2 = document.createElement("div");
  carousel2.classList.add("carouselHorizontal");
  carousel2.id = "carousel2";
  list.appendChild(carousel2);

  let carousel3 = document.createElement("div");
  carousel3.classList.add("carouselHorizontal");
  carousel3.id = "carousel3";
  list.appendChild(carousel3);

  mainDiv.appendChild(list);
  console.log("Startscreen wird aufgerufen");

  // Carousels initialisieren
  initCarousel();
}
