"use strict";

function addCommentForAFilm() {
  let addCommentRequest = new XMLHttpRequest();

  const url = "http://localhost:8082/comments";
  const filmId = document.getElementById("videoPlayer").filmId;
  const userId = getCookie("user");

  addCommentRequest.open("POST", url, true);
  addCommentRequest.setRequestHeader("Content-Type", "application/json");

  addCommentRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      //FIXME remove
      console.log("Kommentar erfolgreich gespeichert");

      //Todo reload page
      console.log(addCommentRequest.responseText);

      //new
      //window.location.reload();
      loadCommentsForFilm(filmId);
      //new
    } else {
      console.log("Kommentar failed");
      console.log(addCommentRequest.responseText);
    }
  };

  let commentText = document.getElementById("addCommentTextArea").value.trim();
  let jsonComment = JSON.stringify({
    userId: userId,
    filmId: filmId,
    text: commentText,
  });
  addCommentRequest.send(jsonComment);
}
