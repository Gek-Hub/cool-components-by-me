const list = document.getElementsByName("cbox");
const COLOR_LIST = [
  "red",
  "orange",
  "yellow",
  "lime",
  "rgb(0, 213, 255)",
  "blue",
  "blueviolet",
];
const colorContainer = document.getElementById("color__container");
COLOR_LIST.forEach((el) => {
  const box = document.createElement("div");
  box.className = "color-box";
  box.style.background = el;
  box.draggable = "true";
  colorContainer.append(box);
});
// function changeColor() {
//   list.forEach((el) => {
//     if (el.checked) {
//       document.getElementById("text" + el.id).style.color =
//         this.style.background;
//     }
//   });
// }

function dragNdrop() {
  const items = document.querySelectorAll(".color-box");
  const placeholders = document.querySelectorAll(".placeholder");
  items.forEach(function (item) {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
  });
  console.log(items);

  placeholders.forEach((placeholder) => {
    placeholder.addEventListener("dragover", dragOver);
    placeholder.addEventListener("drop", dragDrop);
  });
  function dragStart(event) {
    event.target.classList.add("hold");
    setTimeout(() => {
      event.target.classList.add("hide");
    }, 0);
  }
  function dragEnd(event) {
    event.target.classList.remove("hold");
    event.target.classList.remove("hide");
  }
  function dragOver(event) {
    if (!event.target.className.includes("item")) {
      event.preventDefault();
    }
  }
  function dragDrop(event) {
    event.target.style.color = document.querySelector(".hold").style.background;
  }
}
dragNdrop();
