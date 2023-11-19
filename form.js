document.querySelector("form").onsubmit = function (event) {
  let isValid = true;
  let name = document.getElementById("username").value;
  if (!name) {
    isValid = false;
    setError("username", "Введите username");
  } else {
    clearError("username");
  }
  let emailRegex = /^\S+@\S+\.\S+$/;
  let email = document.getElementById("email").value;
  if (!email) {
    isValid = false;
    setError("email", "Введите  e-mail");
  } else if (!emailRegex.test(email)) {
    setError("email", "Неправильно введен e-mail");
    isValid = false;
  } else {
    clearError("email");
  }
  let password = document.getElementById("password").value;
  if (!password) {
    isValid = false;
    setError("password", "Введите  Password");
  } else {
    clearError("password");
  }
  let confirmPassword = document.getElementById("confirm-password").value;
  if (!confirmPassword) {
    isValid = false;
    setError("confirm-password", "Введите Confirm Password");
  } else if (!(password === confirmPassword)) {
    setError("confirm-password", "Пороли не совподают");
    isValid = false;
  } else {
    clearError("confirm-password");
  }
  if (!isValid) {
    event.preventDefault();
  }
};
function setError(fieldId, message) {
  document.getElementById(fieldId).nextElementSibling.textContent = message;
}
function clearError(fieldId) {
  document.getElementById(fieldId).nextElementSibling.textContent = "";
}
