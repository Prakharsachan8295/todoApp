const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
console.log("___", listcontainer);
renderList();
function addtask() {
  console.log("___called");
  if (inputbox.value === "") {
    alert("write something you fool");
  } else {
    const newItem = { content: inputbox.value };
    const todoAppData_str = localStorage.getItem("todoAppData");
    let todoAppData = JSON.parse(todoAppData_str);
    const lists = todoAppData.lists;
    const loggedInUser_str = sessionStorage.getItem("todoAppUser");
    const loggedInUser = JSON.parse(loggedInUser_str);
    console.log("lists", lists);
    console.log("loggedInUser", loggedInUser);
    let sahiWaliList = lists[loggedInUser.email];
    if (sahiWaliList) {
      sahiWaliList = [...sahiWaliList, newItem];
    } else {
      sahiWaliList = [newItem];
    }
    todoAppData = {
      ...todoAppData,
      lists: { ...todoAppData.lists, [loggedInUser.email]: sahiWaliList },
    };
    localStorage.setItem("todoAppData", JSON.stringify(todoAppData));
    renderList();
  }
}
function renderList() {
  clearTheList();
  const todoAppData_str = localStorage.getItem("todoAppData");
  const todoAppData = JSON.parse(todoAppData_str);
  const lists = todoAppData.lists;
  const loggedInUser_str = sessionStorage.getItem("todoAppUser");
  if (!loggedInUser_str) {
    window.location.href = "./login_page/login.html";
    return;
  }
  const loggedInUser = JSON.parse(loggedInUser_str);
  console.log("lists", lists);
  console.log("loggedInUser", loggedInUser);
  const sahiWaliList = lists[loggedInUser.email] ?? [];
  sahiWaliList.forEach((item, index) => {
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
  const todoAppData_str = localStorage.getItem("todoAppData");
  let todoAppData = JSON.parse(todoAppData_str);
  const lists = todoAppData.lists;
  const loggedInUser_str = sessionStorage.getItem("todoAppUser");
  if (!loggedInUser_str) {
    window.location.href = "./login_page/login.html";
    return;
  }
  const loggedInUser = JSON.parse(loggedInUser_str);
  console.log("lists", lists);
  console.log("loggedInUser", loggedInUser);
  const sahiWaliList = lists[loggedInUser.email] ?? [];
  for (let i = 0; i < sahiWaliList.length; i++) {
    if (i != index) {
      updatedItems.push(sahiWaliList[i]);
    }
  }
  todoAppData = {
    ...todoAppData,
    lists: { ...todoAppData.list, [loggedInUser.email]: updatedItems },
  };
  localStorage.setItem("todoAppData", JSON.stringify(todoAppData));
  renderList();
}
function logout() {
  sessionStorage.removeItem("todoAppUser");
  window.location.href = "./login_page/login.html";
}
