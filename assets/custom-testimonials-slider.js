// initialize slideshow

// config:
// assume there is just one single slider on the page
// navigation dots should be disabled
// no autoplay
// infinite loop
// the slides or cells should be aligned to the left side on initialization.
// pauseAutoPlayOnHover: false


// external js: flickity.pkgd.js
const carrousels = document.querySelectorAll(".testimonial-slider");
carrousels.forEach((container) => {
	const dataAutoPlay = Number(container.dataset.autoplay);
	new Flickity(container, {
		// options
		wrapAround: true,
		autoPlay: dataAutoPlay,
		pageDots: false,
        pauseAutoPlayOnHover: false,
    	cellAlign: 'left'
});
});