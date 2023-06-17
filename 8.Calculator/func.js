const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (
      !"1234567890".includes(item.id) &&
      "*+-/%.".includes(display.innerText[display.innerText.length - 1])
    ) {
    } else if (item.id == "%") {
      display.innerText = eval(display.innerText / 100);
    } else if (isNotOneDot(display.innerText) && item.id == ".") {
      console.log("ahahahahha");
    } else if (display.innerText != "" && item.id == "equal") {
      display.innerText =
        Math.round(eval(display.innerText) * 10000000) / 10000000;
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    } else {
      display.innerText += item.id;
    }
  };
});
function isNotOneDot(s) {
  oper = ["*", "/", "+", "-"];
  i = -1;
  oper.forEach((e) => {
    i = s.lastIndexOf(e);
    if (i != -1) {
      s = s.slice(i);
      i = -1;
    }
  });
  return s.indexOf(".") !== -1;
}
