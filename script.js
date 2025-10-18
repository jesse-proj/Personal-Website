const parallaxBackground = document.querySelector('.parallax');

window.addEventListener('scroll', function() {
	var scrollY = window.scrollY;
	var parallaxLayers = Array.from(parallaxBackground.querySelectorAll('img'));
	var nonImageLayers = parallaxBackground.querySelectorAll('.layer')

	for (var i = 0; i < nonImageLayers.length; i++) {
		parallaxLayers.push(nonImageLayers[i]);
	}

	for (var i = 0; i < parallaxLayers.length; i++) {
		var layer = parallaxLayers[i];

		var speed = parseFloat(layer.getAttribute('data-speed'));
		var moveY = scrollY * speed;

		layer.style.transform = 'translateY(' + moveY + 'px)';
	}
});

// Bio Window Opacity

const bioWindow = document.querySelector('#bio-window');

window.addEventListener('scroll', function() {
	var scrollY = window.scrollY;
	var newOpacity = 1 - scrollY / 400;

	bioWindow.style.opacity = newOpacity;
});

// Reveal effect

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();

// Windows

function getWindowButtonsDiv() {
	const buttonsDiv = document.createElement('div');
	buttonsDiv.classList.add('buttons-div');
	buttonsDiv.innerHTML = `
		<img src = "Assets/Window/minimize.png" style = "height: 0.8em">
		<img src = "Assets/Window/maximize.png" style = "height: 0.8em">
		<img src = "Assets/Window/close.png" style = "height: 0.8em">`;

	return buttonsDiv;
}

const windowDivs = document.querySelectorAll('.window');

for(var i = 0; i < windowDivs.length; i++) {
	var windowTitle = windowDivs[i].getAttribute('data-title');

	var titleDiv = document.createElement('div');
	titleDiv.classList.add('window-title');
	titleDiv.innerHTML = '<p>' + windowTitle + ' </p>'

	titleDiv.appendChild(getWindowButtonsDiv());

	windowDivs[i].prepend(titleDiv);
}
