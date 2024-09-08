import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJzY_Jo4PktAuU4bH1Jb8FqeltSSuNO1s",
  authDomain: "blog-login-4ada4.firebaseapp.com",
  projectId: "blog-login-4ada4",
  storageBucket: "blog-login-4ada4.appspot.com",
  messagingSenderId: "328478907216",
  appId: "1:328478907216:web:ef30ed094a6b8f83e82a55",
  measurementId: "G-SZL38CHH35"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");

window.signup = function (e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
    confirm_password: confirm_password.value,
  };
  var json = JSON.stringify(obj);

  if (obj.confirm_password == obj.password) {
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then(function (success) {
        localStorage.setItem("login_info", json);
        console.log("user added successfully");
        window.location = "./";
      })
      .catch(function (err) {
        alert("error" + err);
      });
    // console.log(obj);
  } else {
    alert("password does not match");
  }
};
window.addEventListener("popstate", function (event) {
  location.reload();
});
