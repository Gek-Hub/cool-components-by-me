const slide = document.querySelectorAll('.slide');

slide.forEach((item) => {
	item.addEventListener('click', () => {
		clearActiveSlides();
		item.classList.add('active');
	});
});
function clearActiveSlides() {
	slide.forEach(item => {
		item.classList.remove('active');
	});
}