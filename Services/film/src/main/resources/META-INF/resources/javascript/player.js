"use strict";

/**
 * Lädt die Detailinfos zu einem Film aus dem Microservice und initialisiert die Seite mit den Infos.
 *
 * @param filmId - ID des Films
 */
function loadInfo(filmId) {
  let filmRequest = new XMLHttpRequest();

  // Fehlermeldung für den AJAX-Aufruf
  filmRequest.addEventListener("error", function () {
    showSnackbar("Laden der Informationen zum Film fehlgeschlagen.");
  });

  filmRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let film = JSON.parse(filmRequest.responseText);

      // Filminformationen in die HTML-Datei schreiben
      document.getElementById("titleValue").innerHTML = film.title;
      document.getElementById("dateValue").innerHTML = film.release.substring(
        0,
        film.release.length - 1
      );
      document.getElementById("ageValue").innerHTML = film.age;
      document.getElementById("lengthValue").innerHTML = film.length;
      document.getElementById("actorValue").innerHTML = film.actors;

      // add genres to filminfo
      let genre = "";
      for (let i = 0; i < film.genres.length; i++) {
        genre += film.genres[i].name + ", ";
      }
      genre = genre.substring(0, genre.length - 2);
      document.getElementById("genreValue").innerHTML = genre;

      window.scrollTo({ top: 0, behavior: "smooth" });
      let name = film.title;
      window.location.hash = "player_" + film.id.split(" ").join("_");
      console.log("Filminformationen von " + name + " wurde geladen.");
    }
  };

  filmRequest.open("GET", "http://localhost:8080/film/" + filmId, true);
  filmRequest.send();
}

/**
 * Lädt die durchschnittliche Bewertung zu einem Film.
 *
 * @param filmId - ID des Films
 */
function loadRatingForFilm(filmId) {
  let ratingRequest = new XMLHttpRequest();

  ratingRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let averageRating = JSON.parse(ratingRequest.responseText);

      if (averageRating === undefined || averageRating.length === 0) {
        averageRating = 0;
      }

      // print rating
      console.log("Rating: " + averageRating);

      let averageRatingText = document.getElementById("ratingValue");
      averageRatingText.innerHTML = averageRating + " / 5";
    } else {
      console.log(ratingRequest.responseText);
    }
  };

  ratingRequest.open(
    "GET",
    "http://localhost:8083/rating/?filmId=" + filmId,
    true
  );
  ratingRequest.send();
}

/**
 * Lädt alle Kommentare zu einem Film.
 *
 * @param filmId - ID des Films
 */
function loadCommentsForFilm(filmId) {
  let commentsRequest = new XMLHttpRequest();
  commentArea.innerHTML = "";
  commentsRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let comments = JSON.parse(commentsRequest.responseText);

      if (comments === undefined || comments.length === 0) {
        console.log("no comments found");
        console.log(commentsRequest.responseText);
      } else {
        //build comment section
        let commentArea = document.getElementById("commentArea");

        for (let i = 0; i < comments.length; i++) {
          let commentDiv = document.createElement("div");
          commentDiv.classList.add("comment");

          let commentText = document.createElement("textarea");
          commentText.classList.add("commentText");
          commentText.setAttribute("disabled", "true");
          commentText.innerHTML = comments[i].text;
          commentDiv.appendChild(commentText);

          console.log("Text: " + comments[i].text);

          commentArea.appendChild(commentDiv);
        }
      }
    } else {
      //error message
      console.log(commentsRequest.responseText);
    }
  };

  commentsRequest.open(
    "GET",
    "http://localhost:8082/comments/?filmId=" + filmId,
    true
  );
  commentsRequest.send();
}

/**
 * Lädt die HTML-Seite zur Anzeige des Videoplayers.
 *
 * @param filmId - ID des Filmes
 */
function loadPlayer(filmId) {
  let xmlReq = new XMLHttpRequest();
  xmlReq.overrideMimeType("text/html");

  // Fehlermeldung für den AJAX-Aufruf
  xmlReq.addEventListener("error", function () {
    showSnackbar("Laden des Players ist fehlgeschlagen.");
  });

  xmlReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("main").innerHTML = xmlReq.responseText;
      // Source des Videoplayers ändern
      let video = document.getElementById("videoPlayer");
      video.setAttribute("controlsList", "nodownload");
      let filmObject = document.getElementById("videoPlayer");
      filmObject.filmId = filmId;
      let source = document.createElement("source");
      source.setAttribute("src", "videos/" + filmId + ".mp4");
      video.appendChild(source);

      // Lautstärke des Players auf letzte eingestellte Lautstärke einstellen
      if (supports_html5_storage()) {
        if (localStorage.trailerWatchVolume) {
          video.volume = Number(localStorage.trailerWatchVolume);
        }
      }

      // Listener für das Ändern der Lautstärke
      video.onvolumechange = function () {
        if (supports_html5_storage()) {
          if (video.muted) {
            localStorage.setItem("trailerWatchVolume", "0");
          } else {
            localStorage.setItem("trailerWatchVolume", video.volume);
          }
        }
      };

      console.log("Player wurde geladen.");

      // Carousel initialisieren
      initCarousel();

      // Info des Films laden
      loadInfo(filmId);

      //Kommentare zu dem Film laden
      loadCommentsForFilm(filmId);

      //Bewertungen zu dem Film laden
      loadRatingForFilm(filmId);
    }
  };

  xmlReq.open("GET", "player.html", true);
  xmlReq.send();
}
