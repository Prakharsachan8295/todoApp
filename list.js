const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
console.log("___", listcontainer);
function addtask() {
  console.log("___called");
  if (inputbox.value === "") {
    alert("write something you fool");
  } else {
    const newItem = { content: inputbox.value };
    listItems.push(newItem);
    renderList();
    console.log("___", listItems);
  }
}
function renderList() {
  clearTheList();
  listItems.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${item.content}<button onclick="removeItem(${index})">delete</button>`;
    listcontainer.appendChild(li);
  });
}
function clearTheList() {
  while (listcontainer.firstChild) {
    listcontainer.removeChild(listcontainer.firstChild);
  }
}
function removeItem(index) {
  console.log("-removing items", index);
  const updatedItems = [];
  for (let i = 0; i < listItems.length; i++) {
    if (i != index) {
      updatedItems.push(listItems[i]);
    }
  }

  listItems = updatedItems;
  renderList();
}
function logout() {
  sessionStorage.removeItem("todoAppUser");
  window.location.href = "./login ";
}
