"use strict";

function addRatingToAFilm() {
  let addRatingRequest = new XMLHttpRequest();

  const url = "http://localhost:8083/rating";
  const filmId = document.getElementById("videoPlayer").filmId;
  const userId = getCookie("user");

  addRatingRequest.open("POST", url, true);
  addRatingRequest.setRequestHeader("Content-Type", "application/json");

  addRatingRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      //Todo reload page
      loadRatingForFilm(filmId);
      console.log(addRatingRequest.responseText);
    } else {
      console.log(addRatingRequest.responseText);
    }
  };

  let ratingValue = document.getElementById("rating").value;
  let jsonRating = JSON.stringify({
    filmId: filmId,
    userId: userId,
    value: ratingValue,
  });
  addRatingRequest.send(jsonRating);
}
