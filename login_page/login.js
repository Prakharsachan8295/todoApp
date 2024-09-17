let valid = true;
function signup() {
  valid = true;
  console.log("___here");
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  if (name.trim() === "") {
    document.getElementById("name-error").textContent = "Name is required.";
    valid = false;
  }
  if (email.trim() === "") {
    document.getElementById("email-error").textContent = "email is required.";
    valid = false;
  }
  if (password.trim() === "") {
    document.getElementById("password-error").textContent =
      "password is required.";
    valid = false;
  }
  if (!valid) {
    return;
  } else {
    event.preventDefault();
    const newUser = {
      name,
      password,
      email,
    };
    const todoAppData_str = localStorage.getItem("todoAppData");
    if (todoAppData_str) {
      const todoAppData = JSON.parse(todoAppData_str);
      let savedUsers = todoAppData.users;
      const user = savedUsers.find(
        (userInfo) => userInfo.email === newUser.email
      );
      if (user) {
        window.alert("This Email is already taken");
      } else {
        savedUsers = [...savedUsers, newUser];
        const appData = {
          ...todoAppData,
          users: savedUsers,
        };
        localStorage.setItem("todoAppData", JSON.stringify(appData));
      }
    } else {
      const appData = {
        users: [{ ...newUser }],
        lists: {},
      };
      localStorage.setItem("todoAppData", JSON.stringify(appData));
    }
  }
  console.log("___users", users);
}
function signin() {
  if (document.getElementById("name").value.trim() === "") {
    document.getElementById("name-error").textContent = "Name is required.";
    valid = false;
  }
  if (document.getElementById("email").value.trim() === "") {
    document.getElementById("email-error").textContent = "email is required.";
    valid = false;
  }
  if (document.getElementById("password").value.trim() === "") {
    document.getElementById("password-error").textContent =
      "password is required.";
    valid = false;
  }
  if (!valid) {
    return;
  } else {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const todoAppData_str = localStorage.getItem("todoAppData");
    if (todoAppData_str) {
      const appData = JSON.parse(todoAppData_str);
      const users = appData.users;
      const user = users.find((userInfo) => userInfo.email === email);
      if (!user) {
        window.alert("please sign up");
        return;
      }
      if (user.password !== password) {
        window.alert("wrong password");
        return;
      }
      window.location.href = "../list.html";
      sessionStorage.setItem("todoAppUser", JSON.stringify(user));
    } else {
      window.alert("signup first");
    }
  }
}
function matchUser(user, email) {
  if (user.email == email) {
    return true;
  } else {
    return false;
  }
}
