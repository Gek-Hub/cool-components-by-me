const startBtn = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const timelist = document.querySelector(".time-list");
const timeEl = document.querySelector("#time")
const board = document.querySelector("#board");
const COLORS = ['linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)',
 'linear-gradient(90deg, #e96c0c 0%, #e9410e 47%, #ff0000 100%)', 
 'linear-gradient(90deg, #e9e90c 0%, #c5e90e 47%, #73ff00 100%)',
 'linear-gradient(90deg, #a30ce9 0%, #d30ee9 37%, #ee23ee 100%)'];

let time = 0;
let score = 0;
startBtn.addEventListener("click", event => {
	event.preventDefault();
	screens[0].classList.add("up");
})
timelist.addEventListener("click", event=>{
	if (event.target.classList.contains("time-btn")) {
		time=+event.target.getAttribute("time")+1;
		screens[1].classList.add("up");
		startGame(time);
	}
});
board.addEventListener("click", (e) => {
		if (e.target.classList.contains("random-circle") ){
			score++
			e.target.remove();
			createRandomCircle()
		}
	
});
function startGame(time){
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	decreaseTime();
}
function decreaseTime() {
	if (time>0) {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
	setTime(current);
	} else {
		finishGame();
	}
	
}
function finishGame() {
	board.innerHTML = `<h1>Вы набили <span class="primary">${score}</span> очков</h1>`;
	timeEl.parentNode.classList.add('hide');
}
function setTime(time) {
	timeEl.innerHTML = `00:${time}`;
}
function createRandomCircle() {
	const circle = document.createElement('div');
	circle.className = 'random-circle';
	const {width, height} = board.getBoundingClientRect();
	const diameteretr = getRandomNum(20, 40);
	const x = getRandomNum(0,width-diameteretr);
	const y = getRandomNum(0,height-diameteretr);
	circle.style.width = `${diameteretr}px`;
	circle.style.height = `${diameteretr}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.background = `${COLORS[getRandomNum(0, COLORS.length)]}`;
	board.append(circle);
}
function getRandomNum(min,max) {
	return Math.floor(Math.random() * (max - min) + min);
}