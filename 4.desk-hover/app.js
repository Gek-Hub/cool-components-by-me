const board2 = document.querySelector('#board1');
const SQUARES_NUMBER2 = 200;
const COLORS = ['#311', '#533', '#755', '#977', '#b99', '#caa', '#ecc'];
const colorsCount = createCounter(COLORS.length);	
for (let i = 0; i < SQUARES_NUMBER2; i++) {
	const square = document.createElement('div');
	square.className = 'square';
	square.addEventListener("mouseover", ()=>setColor(square))
	square.addEventListener("mouseleave", ()=>removeColor(square))
	board2.append(square);
}


function setColor(element) {
	element.style.backgroundColor = 'red';
}
//==============================================================//
const board = document.querySelector('#board1');
const SQUARES_NUMBER = 200;
for (let i = 0; i < SQUARES_NUMBER; i++) {
	const square = document.createElement('div');
	square.className = 'square';
	square.addEventListener("mouseover", ()=>setColor(square, COLORS[6]))
	board.append(square);
}


function setColor(element, color=getRandomColor()) {
	
	element.style.backgroundColor = color;
	element.style.boxShadow = `0 0 4px ${color}`;
}
function removeColor(element) {
	element.style.backgroundColor = '#444';
	element.style.boxShadow = `0 0 2px #000`;
}
function getRandomColor() {
	return COLORS[colorsCount()];
}
function createCounter(i) {
	let counter = 0;
	return function (){
		counter++;
		if (counter === i){
			counter = 0;
		}
		return counter;
	}
}