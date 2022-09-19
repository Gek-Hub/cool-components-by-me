function dragNdrop(){const items = document.querySelectorAll(".item");
const placeholders = document.querySelectorAll(".placeholder");
items.forEach(function (item) {
item.addEventListener("dragstart", dragStart)
item.addEventListener("dragend", dragEnd)
})
placeholders.forEach(placeholder => {
	placeholder.addEventListener('dragover', dragOver);
	placeholder.addEventListener('dragenter', dragEnter);
	placeholder.addEventListener('dragleave', dragLeave);
	placeholder.addEventListener('drop', dragDrop);
})
function dragStart(event) {
	event.target.classList.add('hold')
	setTimeout(() => {
		event.target.classList.add('hide')
	}, 0);
	
}
function dragEnd(event) {
	event.target.classList.remove('hold')
	event.target.classList.remove('hide')
	
}
function dragOver(event) {
	if(!event.target.className.includes('item')) {

	event.preventDefault();
	}
}
function dragEnter(event) {
	event.target.classList.add('hovered');
	
	
}function dragLeave(event) {
	event.target.classList.remove('hovered');

}function dragDrop(event) {
	event.target.classList.remove('hovered');

	event.target.append(document.querySelector('.hold'));
}}
dragNdrop()