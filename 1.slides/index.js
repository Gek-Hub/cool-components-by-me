function slider(activeSlide) {
	const slide = document.querySelectorAll('.slide');
	
	slide[activeSlide].classList.add('active');
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
}
slider(2);