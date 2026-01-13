// initialize slideshow

// config:
// assume there is just one single slider on the page
// navigation dots should be disabled
// no autoplay
// infinite loop
// the slides or cells should be aligned to the left side on initialization.
// pauseAutoPlayOnHover: false


// external js: flickity.pkgd.js
const slideshow_container = document.querySelector(".testimonial-slider");
const slider = new Flickity(slideshow_container, {
	// options
	wrapAround: true,
	autoPlay: false,
	pageDots: false,
    pauseAutoPlayOnHover: false,
    cellAlign: 'left'
});
