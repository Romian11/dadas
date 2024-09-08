const loginBtn = document.getElementById("btn_login");
const signupBtn = document.getElementById("btn_signup");
const logoutBtn = document.getElementById("logout_btn");

const user = JSON.parse(localStorage.getItem("login_info"));
console.log(user);

function updateButtonDisplay() {
  if (user === null) {
    loginBtn.style.display = "block";
    signupBtn.style.display = "block";
    logoutBtn.style.display = "none";
  } else {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "block";
  }
}

function redirectToLogin() {
  console.log("Redirecting to login");
  setTimeout(function () {
    window.location.href = "/login";
  }, 60000);
}

function login() {
  if (user === null) {
    updateButtonDisplay();
    redirectToLogin();
  } else {
    updateButtonDisplay();
  }
}

login();

window.addEventListener("popstate", function (event) {
  location.reload();
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("login_info");
  updateButtonDisplay();
  location.reload();
});

// Sign up
signupBtn.addEventListener("click", () => {
  window.location.href = "/signup";
});

// Log in
loginBtn.addEventListener("click", () => {
  if (user !== null) {
    localStorage.removeItem("login_info");
    loginBtn.innerHTML = "Log In";
    updateButtonDisplay();
    location.reload();
  } else {
    window.location.href = "/login";
  }
});

function returnHome() {
  window.location.href = "/";
}
