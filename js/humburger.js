//This is a file used to set the Hamburger icon when screen is small.
//Conceal the left bar when the screen is small
var drawer = document.querySelector('.opt_box');
//Open the left bar when click the hamburger
document.getElementById('menu').addEventListener('click', function(e) {
	drawer.classList.toggle('open');
	e.stopPropagation();
});
//Conceal the left bar again when clicking any place of the container.
document.getElementById('hide-bar').addEventListener('click', function(e) {
	drawer.classList.remove('open');
});