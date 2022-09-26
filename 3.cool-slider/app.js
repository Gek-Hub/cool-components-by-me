const upBtn = document.querySelector('.up-button')
const downBtn = document.querySelector('.down-button')
const sidebar = document.querySelector('.sidebar');
const mainSlide = document.querySelector('.main-slide');
const slidesCount = mainSlide.querySelectorAll('div').length - 1;
const container = document.querySelector('.container');
let activeSlideIndex = slidesCount; 
sidebar.style.top = `-${(activeSlideIndex)*100}vh`;

upBtn.addEventListener('click', (e) => {
	changeSlade('up')
})
downBtn.addEventListener('click', (e) => {
	changeSlade('down')
})
document.addEventListener('keydown', (e) => {
	if (e.key === "ArrowUp") { changeSlade('up') }
	if (e.key === "ArrowDown") { changeSlade('down') }
})
function changeSlade(dir){
	if (dir ==="up") {
		activeSlideIndex++;
		if (activeSlideIndex > slidesCount) {
			activeSlideIndex=0;
			console.log(activeSlideIndex);
		}
	}
	if (dir ==="down") {
		activeSlideIndex--;
		if (activeSlideIndex < 0) {
			activeSlideIndex=slidesCount;
			console.log(activeSlideIndex);

		}
	}
	const height = container.clientHeight;
	mainSlide.style.transform = `translateY(-${height*activeSlideIndex}px)`;
	sidebar.style.transform = `translateY(${height*activeSlideIndex}px)`
}
