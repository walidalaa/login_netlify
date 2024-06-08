var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var signUpArray = [];
if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}
//  sign-up
function signUp() {
  var name = signupName.value;
  var email = signupEmail.value;
  var password = signupPassword.value;

  // Validate input
  if (!name || !email || !password) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  //check exist user
  for (var i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == email.toLowerCase()) {
      document.getElementById("exist").innerHTML =
        '<span class="text-danger m-3">email already exists</span>';
      return false;
    }
  }

  var newUser = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  signUpArray.push(newUser);
  localStorage.setItem("users", JSON.stringify(signUpArray));
  document.getElementById("exist").innerHTML =
    '<span class="text-success m-3">Success</span>';

  clearForm();
}

// clear the form
function clearForm() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

// Function to handle login
function login() {
  var email = signinEmail.value;
  var password = signinPassword.value;

  // Validate input
  if (!email || !password) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }

  var password = signinPassword.value;
  var email = signinEmail.value;
  for (var i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() == email.toLowerCase() &&
      signUpArray[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", signUpArray[i].name);
      window.location.href = "home.html";
    } else {
      document.getElementById("incorrect").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}

var username = localStorage.getItem("sessionUsername");
if (username) {
  document.getElementById("username").textContent = " Welcome " + username;
}

function logout() {
  window.location.href = "/logout";
}
