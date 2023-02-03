'use strict';

/**
 * Liste von Carousels
 *
 * @type {HTMLCollectionOf<Element>}
 */
let carouselList = document.getElementsByClassName("carouselHorizontal");

/**
 * Lädt alle Filme durch Request an den Film-Microservice und erstellt die Carousels.
 */
function initCarousel() {
	console.log("Carousels werden initialisiert");

	// AJAX-Request an den Film-Microservice
	let filmRequest = new XMLHttpRequest();
	filmRequest.addEventListener("error", function () {
		console.log(this.responseText)
		showSnackbar("Laden der Filme ist fehlgeschlagen.");
	});

	filmRequest.onreadystatechange = function () {
		// Request war erfolgreich
		if (this.readyState === 4 && this.status === 200) {
			let films = JSON.parse(this.responseText);

			console.log("Filme erfolgreich geladen");

			createCarousel(films);
		}
	}
	// asynchrone GET-Request an den Film REST-Endpunkt
	filmRequest.open("GET", "http://localhost:8080/film/all", true);
	filmRequest.send();
}

/**
 * Erstellt anhand der Liste der Filme die Carousels.
 *
 * @param films - Liste der Filme
 */
function createCarousel(films) {
	for (let m = 0; m < carouselList.length; m++) {
		console.log("Erstelle Carousel " + carouselList[m].getAttribute("id"));
		let pictureCounter = 0;
		let randomIndizes = shuffleIndizes(films.length);

		// So viele Slides wie Gesamtzahl der Filme / 5
		for (let i = 0; i < (films.length / 5); i++) {
			let slideDiv = document.createElement("div");
			slideDiv.classList.add("carouselSlide");
			slideDiv.classList.add("fade");

			for (let j = 0; j < 5; j++) { //Pro Slide werden fünf Filme angezeigt
				let carouselElement = document.createElement("div");
				let filmID = films[randomIndizes[pictureCounter]].id;

				carouselElement.classList.add("carouselHorizontalElement");
				carouselElement.addEventListener("mouseover", function () {
					showPrevInfo(carouselElement)
				});
				carouselElement.addEventListener("mouseout", function () {
					hidePrevInfo(carouselElement)
				});

				carouselElement.addEventListener("click", function () {
					console.log("User klickt auf Play von " + filmID);
					loadPlayer(filmID);
				});

				let carouselPreviewBackground = document.createElement("div");
				carouselPreviewBackground.classList.add("carouselHorizontalPreviewBackground");

				let carouselPreviewText = document.createElement("div");
				carouselPreviewText.classList.add("carouselPreviewText");

				let carouselPreviewTextHead = document.createElement("span");
				carouselPreviewTextHead.classList.add("carouselPreviewTextHead");
				carouselPreviewTextHead.innerHTML = films[randomIndizes[pictureCounter]].title;

				let carouselPreviewTextBody = document.createElement("div");
				carouselPreviewTextBody.classList.add("carouselPreviewTextBody");
				carouselPreviewTextBody.classList.add("far");
				carouselPreviewTextBody.classList.add("fa-play-circle");

				let carouselPreviewTextFooter = document.createElement("div");
				carouselPreviewTextFooter.classList.add("carouselPreviewTextFooter");


				if (isFavourite(filmID)) {
					carouselPreviewTextFooter.classList.add("fas");
					carouselPreviewTextFooter.classList.add("fa-heart");
				} else {
					carouselPreviewTextFooter.classList.add("far");
					carouselPreviewTextFooter.classList.add("fa-heart");
				}

				carouselPreviewTextFooter.addEventListener("click", function (e) {
					e.stopPropagation();
					console.log("User klickt auf Herz von " + filmID);
					manageFavourite(carouselPreviewTextFooter, filmID);
				});

				// add elements to parent element
				carouselPreviewText.appendChild(carouselPreviewTextHead);
				carouselPreviewText.appendChild(carouselPreviewTextBody);
				carouselPreviewText.appendChild(carouselPreviewTextFooter);
				carouselPreviewBackground.appendChild(carouselPreviewText);

				let imgElement = document.createElement("img");
				imgElement.classList.add("carouselImage");
				imgElement.setAttribute("src", "pictures/" + filmID + ".jpg");
				imgElement.setAttribute("draggable", "false");

				carouselElement.appendChild(carouselPreviewBackground);
				carouselElement.appendChild(imgElement);

				slideDiv.appendChild(carouselElement);

				pictureCounter++;
			}
			carouselList[m].appendChild(slideDiv);
		}

		let prev = document.createElement("div");
		prev.classList.add("prev");
		prev.addEventListener("click", function () { //Wenn der linke Button im Carousel gedrückt wird
			changeSlides(prev, -1)
		});

		let prevP = document.createElement("p");
		prevP.style.margin = "auto";
		prevP.innerHTML = "&#10094;";
		prev.appendChild(prevP);
		carouselList[m].appendChild(prev);

		let next = document.createElement("div");
		next.classList.add("next");
		next.addEventListener("click", function () { //Wenn der rechte Button im Carousel gedrückt wird
			changeSlides(next, 1)
		});

		let nextP = document.createElement("p");
		nextP.style.margin = "auto";
		nextP.innerHTML = "&#10095;";
		next.appendChild(nextP);
		carouselList[m].appendChild(next);
	}

	showCarousel();
}

/**
 * Sortiert die Indizes der Filme zufällig um, damit die Filme in unterschiedlicher Reihenfolge angezeigt
 * werden können.
 *
 * @param filmCounter - Anzahl der Filme
 * @returns {any[]} Liste mit zufällig sortierten Indizes
 */
function shuffleIndizes(filmCounter) {
	let pictureArray = [];
	for (let i = 0; i < filmCounter; i++) {
		pictureArray.push(i);
	}
	console.log("Indizes vor dem Mischen: " + pictureArray);
	let resultArray = [];
	while (pictureArray.length > 0) {
		let randomIndex = Math.floor(Math.random() * pictureArray.length);

		resultArray.push(pictureArray[randomIndex]);
		pictureArray.splice(randomIndex, 1);
	}
	console.log("Indizes nach dem Mischen: " + resultArray);
	return resultArray;
}

/**
 * Überprüfe ob der übergebene Film im LocalStorage (wenn unterstützt) des Browsers hinterlegt, also Favorit ist
 *
 * @param filmId - ID des Filmes
 * @returns {boolean} - True, wenn Film ein Favorit ist. False, wenn nicht.
 */
function isFavourite(filmId) {
	let result = false;

	// REST-Request an den Film-Microservice
	let checkRequest = new XMLHttpRequest();

	checkRequest.addEventListener("error", function () {
		console.log("Abfragen des Favoriten ist fehlgeschlagen");
		result = false;
	});

	checkRequest.onreadystatechange = function () {
		// Request war erfolgreich
		if (this.readyState === 4 && this.status === 200) {
			result = JSON.parse(this.responseText);
		}
	}

	// Body der Request als JSON erstellen
	const requestBody = {
		"userId" : getCookie("user"),
		"filmId" : filmId
	}

	// synchrone POST-Request, da Antwort direkt zurückgegeben werden muss
	checkRequest.open("POST", "http://localhost:8080/favourite/check", false);
	checkRequest.setRequestHeader("Content-Type", "application/json");
	checkRequest.send(JSON.stringify(requestBody));

	return result;
}

/**
 * Wird aufgerufen wenn User auf das Herz klickt und ändert dieses in ein ausgefülltes, wenn es noch nicht favorisiert ist.
 * Andernfalls in ein nicht ausgefülltes.
 *
 * @param carouselPreviewTextFooter - HTML-Element des Filmes
 * @param filmId - ID des Filmes
 */
function manageFavourite(carouselPreviewTextFooter, filmId) {
	let userId = getCookie("user");

	if (carouselPreviewTextFooter.classList.contains("fas")) {
		// Film wurde bereits favorisiert, Film wird aus Favoriten entfernt
		carouselPreviewTextFooter.classList.remove("fas");
		carouselPreviewTextFooter.classList.add("far");
		removeFavourite(filmId, userId, true);
	} else {
		// Film wurde noch nicht favorisiert, Film wird zu Favoriten hinzugefügt
		carouselPreviewTextFooter.classList.remove("far");
		carouselPreviewTextFooter.classList.add("fas");
		addFavourite(filmId, userId);
	}
}

/**
 * Entfernt den übergebenen Film aus den Favoriten.
 *
 * @param filmId - ID des Filmes
 * @param userId - ID des Users
 * @param async - Soll der Request asynchron ausgeführt werden?
 */
function removeFavourite(filmId, userId, async) {
	let removeRequest = new XMLHttpRequest();

	removeRequest.addEventListener("error", function () {
		console.log("Entfernen des Filmes " + filmId + " aus den Favoriten  fehlgeschlagen");
		showSnackbar("Entfernen des Filmes aus den Favoriten  fehlgeschlagen");
	});

	removeRequest.onreadystatechange = function () {
		// Request war erfolgreich
		if (this.readyState === 4 && this.status === 200) {
			console.log(filmId + " wurde aus den Favoriten  entfernt");
			showSnackbar("Film wurde aus den Favoriten entfernt");
		}
	}

	const requestBody = {
		"userId" : userId,
		"filmId" : filmId
	}

	// DELETE-Request an den Film-Microservice
	removeRequest.open("DELETE", "http://localhost:8080/favourite", async);
	removeRequest.setRequestHeader("Content-Type", "application/json");
	removeRequest.send(JSON.stringify(requestBody));
}

/**
 * Füge den übergebenen Film zur Favoritenliste des Users hinzu.
 *
 * @param filmId - ID des Filmes
 * @param userId - ID des Users
 */
function addFavourite(filmId, userId) {
	let addRequest = new XMLHttpRequest();

	addRequest.addEventListener("error", function () {
		console.log("Hinzufügen des Filmes " + filmId + " zu den Favoriten  fehlgeschlagen");
		showSnackbar("Hinzufügen des Filmes zu den Favoriten  ist fehlgeschlagen");
	});

	addRequest.onreadystatechange = function () {
		// Request war erfolgreich
		if (this.readyState === 4 && this.status === 200) {
			console.log(filmId + " wurde zu den Favoriten  hinzugefügt");
			showSnackbar("Film wurde zu den Favoriten  hinzugefügt");
		}
	}

	const requestBody = {
		"userId" : userId,
		"filmId" : filmId
	}

	// asynchrone POST-Request an den Film-Microservice
	addRequest.open("POST", "http://localhost:8080/favourite", true);
	addRequest.setRequestHeader("Content-Type", "application/json");
	addRequest.send(JSON.stringify(requestBody));
}
