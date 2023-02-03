'use strict';
let carousels = document.getElementsByClassName("carouselHorizontal");
let liste = [];

/**
 * Speichert alle auf der Seite vorhandenen Carousels
 */
function showCarousel() {
	liste.length = 0;
	let k;
	for (k = 0; k < carousels.length; k++) {
		let temp = new Carousel(carousels[k]);
		console.log("Zeige " + temp.carouselID);
		liste.push(temp);
		showSlides(temp, temp.slideIndex);
	}
}

/**
 * Konstrutor für ein Carousel
 *
 * @param element
 * @constructor
 */
function Carousel(element) {
	this.carouselID = element.getAttribute("id");
	this.slideIndex = 1;
	this.slides = element.getElementsByClassName("carouselSlide");
}

/**
 * Getter - Anhand der id wird das jeweilige Carousel zurückgegeben
 *
 * @param id
 * @returns {any}
 */
function getCarouselByID(id) {
	let i;
	for (i = 0; i < liste.length; i++) {
		if (liste[i].carouselID === id) {
			return liste[i];
		}
	}
}

/**
 * Wird aufgerufen wenn bei einem Carousel der Prev/Next Button gedrückt wird und wechselt die Slide um n.
 **/
function changeSlides(button, n) {
	let currentCarousel = getCarouselByID(button.parentElement.getAttribute("id"));
	console.log("Wechsle Slide um " + n + " von " + currentCarousel.carouselID);
	showSlides(currentCarousel, currentCarousel.slideIndex += n);
}

/**
 * Macht die Slides sichtbar/unsichtbar
 */
function showSlides(carousel, n) {
	let i;

	if (n > carousel.slides.length) { //Setzt den Slide Index des übergebenen Carousels auf 1, wenn n größer der Anzahl Slides des Carousels ist
		carousel.slideIndex = 1
		console.log("Keine weitere Slides am Ende vorhanden, setze Slide auf 1");
	}
	if (n < 1) { //Setzt den Slide Index des übergebenen Carousels auf den maximal Wert, wenn n kleiner 1 ist
		carousel.slideIndex = carousel.slides.length;
		console.log("Keine weitere Slides am Anfang vorhanden, setze Slide auf Anzahl der Slides");
	}
	for (i = 0; i < carousel.slides.length; i++) { //Blendet alle Slides aus
		carousel.slides[i].style.display = "none";
		console.log("Alle Slides von " + carousel.carouselID + " ausblenden");
	}

	carousel.slides[carousel.slideIndex - 1].style.display = "block"; //Blende die Slide an Stelle von slideIndex - 1 ein.
	console.log(carousel.slideIndex - 1 + "te Slide von " + carousel.carouselID + " einblenden");
}

/**
 * Wird auferufen wenn über einen Film im Carousel gehovert wird.
 *
 * @param carouselElement
 */
function showPrevInfo(carouselElement) {
	carouselElement.children[0].classList.add('show');
	carouselElement.children[0].classList.remove('hide');
}

/**
 * Wird aufgerufen wenn über einen Film im Carousel gehovert wurde.
 *
 * @param carouselElement
 */
function hidePrevInfo(carouselElement) {
	carouselElement.children[0].classList.add('hide');
	carouselElement.children[0].classList.remove('show');
}


