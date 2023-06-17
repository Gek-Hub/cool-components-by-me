let inps = document.getElementsByClassName("val");
const input = document.getElementById("RUB");
for (let i = 0; i < inps.length; i++) {
  inps[i].onchange = changeVals;
}
function changeVals(e) {
  console.log(e);
  for (let i = 0; i < inps.length; i++) {
    if (inps[i] != e.target) {
      inps[i].value = e.target.value * (inps[i].id / e.target.id);
    }
    if (inps[i].id > 0.01) {
      inps[i].value = -(-inps[i].value).toFixed(2);
    }
  }
}
