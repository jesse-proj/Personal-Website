const parallaxBackground = document.querySelector('.parallax');
const parallaxLayers = Array.from(parallaxBackground.querySelectorAll('img'));
const nonImageLayers = parallaxBackground.querySelectorAll('.layer');

for (let i = 0; i < nonImageLayers.length; i++) {
	parallaxLayers.push(nonImageLayers[i]);
}

window.addEventListener('scroll', function() {
	const scrollY = window.scrollY;

	for (let i = 0; i < parallaxLayers.length; i++) {
		const layer = parallaxLayers[i];

		const speed = parseFloat(layer.getAttribute('data-speed'));
		const moveY = scrollY * speed;

		layer.style.transform = 'translateY(' + moveY + 'px)';
	}
});