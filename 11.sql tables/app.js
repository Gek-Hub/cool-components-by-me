var wasDelete = false,
  wasUpdate = false;
async function query() {
  // get elements
  let res = document.getElementById("query_text").value;
  let code = document.getElementById("type").value;
  console.log(code + " " + res);
  wasDelete = code == "delete";
  wasUpdate = code == "update";
  // fetch
  if (code == "insert") {
    document.getElementById("type").value = "select";
  }
  if (
    !(code == "delete" && !confirm("You sure, you want to delete this rows?"))
  )
    await fetch("/query", {
      method: "POST",
      body: JSON.stringify({
        query: res,
        code: code,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // creating table
        var table = document.createElement("table");
        table.classList.add("myTable");
        var thead = table.createTHead();
        var tr = thead.insertRow();
        //rows unpacking
        var rows = JSON.parse(text);
        // titles
        var headers = rows.pop();
        headers.forEach((header) => {
          var th = document.createElement("th");
          th.innerHTML = header;
          tr.appendChild(th);
        });
        // adding rows to table
        var tbody = table.createTBody();
        rows.forEach((row) => {
          var tr = tbody.insertRow();
          row.forEach((cell) => {
            var td = tr.insertCell();
            td.classList.add("td");
            td.innerHTML = cell;
          });
        });
        var result = document.getElementById("result");
        result.innerHTML = "";
        // append table to tag with id result
        result.append(table);
      })
      .catch((error) => alert(`Wrong query!\n${error}`));
  if (wasDelete) {
    deleteTb();
    wasDelete = false;
  }
  if (wasUpdate) {
    updateTb();
    wasUpdate = false;
  }
}
async function changeType(value) {
  // dispay: none to not needed elements
  const userQuery = document.getElementById("query_text");
  const solutionBtn = document.getElementById("solution-btn");
  solutionBtn.innerHTML = "Query";
  userQuery.classList.add("no-visible");
  // which query is used?
  if (value == "user_query") {
    userQuery.classList.remove("no-visible");
  } else if (value == "delete") {
    solutionBtn.innerHTML = "Delete";
    deleteTb();
  } else if (value == "insert") {
    solutionBtn.innerHTML = "Add";
    insertTb();
  } else if (value == "update") {
    solutionBtn.innerHTML = "Change";
    updateTb();
  }
}
async function deleteTb() {
  const userQuery = document.getElementById("query_text");
  // made table
  userQuery.value = "select * from people";
  document.getElementById("type").value = "user_query";
  await query();
  userQuery.value = "";
  document.getElementById("type").value = "delete";
  // add event listener onclick on ids elements
  var tds = document.querySelectorAll(".td");
  for (let i = 0; i < tds.length; i++) {
    if (i % 5 == 0)
      tds[i].onclick = (e) => {
        e.target.className.includes("red")
          ? e.target.classList.remove("red")
          : e.target.classList.add("red");
        let reds = [...document.querySelectorAll(".red")];
        userQuery.value = reds.reduce((acc, el) => {
          acc += el.innerHTML + " ";
          return acc;
        }, "");
        str = userQuery.value.split("");
        str.pop();
        userQuery.value = str.join("");
      };
    else {
      tds[i].classList.remove("td");
    }
  }
}
async function insertTb() {
  const userQuery = document.getElementById("query_text");
  // made table
  userQuery.value = "select * from people where iq=1000";
  document.getElementById("type").value = "user_query";
  await query();
  userQuery.value = "";
  document.getElementById("type").value = "insert";
  var table = document.querySelector(".myTable");
  var tbody = table.createTBody();
  var tr = tbody.insertRow();
  tr.insertCell().innerHTML = "auto";
  tr.insertCell().innerHTML = `<input type="text" id="name" placeholder="Type name" onchange="insertQuery()"/>`;
  tr.insertCell().innerHTML = `<input type="number" id="age" placeholder="Type age" onchange="insertQuery()"/>`;
  tr.insertCell().innerHTML = `<select id="isrus"  onchange="insertQuery()">
  <option value="true">true</option>
  <option value="false">false</option>
</select>`;
  tr.insertCell().innerHTML = `<input type="number" id="iq" placeholder="Type iq" onchange="insertQuery()"/>`;
}
// при изменении инпута в запрос добавляются данные
function insertQuery() {
  const userQuery = document.getElementById("query_text");
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const isrus = document.getElementById("isrus").value;
  const iq = document.getElementById("iq").value;
  userQuery.value = `INSERT INTO people(name,age,russian,iq) VALUES('${
    name || null
  }',${age || null},${isrus || null},${iq || null})`;
}
async function updateTb() {
  const userQuery = document.getElementById("query_text");
  // made table
  userQuery.value = "select * from people";
  document.getElementById("type").value = "user_query";
  await query();
  userQuery.value = "";
  document.getElementById("type").value = "update";
  // add event listener onclick on ids elements
  var tds = document.querySelectorAll(".td");
  for (let i = 0; i < tds.length; i++) {
    if (i % 5 == 0)
      tds[i].onclick = (e) => {
        clickId(e);
      };
    else {
      tds[i].classList.remove("td");
    }
  }
}
function clickId(e) {
  document.querySelectorAll(".td").forEach((td) => {
    td.classList.remove("red");
  });
  e.target.classList.add("red");
  let redRow = document.querySelector("tr > .red").parentElement;
  const name = redRow.querySelector("td:nth-child(2)");
  const age = redRow.querySelector("td:nth-child(3)");
  const russian = redRow.querySelector("td:nth-child(4)");
  const iq = redRow.querySelector("td:nth-child(5)");
  [...document.querySelectorAll(".change-inp")].forEach((e) => {
    e.parentElement.innerHTML = e.value;
  });
  name.innerHTML = `<input class="change-inp" type="text" id="name" value=${name.innerHTML} onchange="changeQuery()"/>`;
  age.innerHTML = `<input class="change-inp" type="number" id="age" value=${age.innerHTML} onchange="changeQuery()"/>`;
  russian.innerHTML = `<select class="change-inp" id="isrus" value=${russian.innerHTML} onchange="changeQuery()">
  <option value="true">true</option>
  <option value="false">false</option>
</select>`;
  iq.innerHTML = `<input class="change-inp" type="number" id="iq" value=${iq.innerHTML} onchange="changeQuery()"/>`;
}

function changeQuery() {
  let rowId = document.querySelector("tr > .red").innerHTML;
  const userQuery = document.getElementById("query_text");
  userQuery.value += `UPDATE people SET 
  name='${document.getElementById("name").value || null}',
  age=${document.getElementById("age").value || null},
  russian=${document.getElementById("isrus").value || null},
  iq=${document.getElementById("iq").value || null}
  WHERE id=${rowId};`;
}
