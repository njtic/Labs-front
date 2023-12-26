/**
 * Функция для проверки валидности значения поля
 * @param {string} fieldId
 * @param {string} fieldValue
 * @param {string} errorMessage
 * @returns
 */
function checkValid(fieldId, fieldValue, errorMessage) {
  /**
   * Эта логика повторялась, я винес ее в отдельную функцию
   */

  if (!fieldValue) {
    setError(fieldId, errorMessage);
    return false;
  } else {
    clearError(fieldId);
    return true;
  }
}

function checkEmail(emailValue) {
  const emailRegex = /^\S+@\S+\.\S+$/;

  // Дополнительная провека почты
  if (emailValue && !emailRegex.test(emailValue)) {
    setError("email", "Неправильно введен e-mail");
    return false;
  }

  // Переиспользование логики
  return checkValid("email", emailValue, "Введите  e-mail");
}

function checkConfirmPassword(confirmPasswordValue, password) {
  // Дополнительная провека пароля
  if (confirmPasswordValue && !(password === confirmPasswordValue)) {
    setError("confirm-password", "Пароли не совподают");
    return false;
  }

  // Переиспользование логики
  return checkValid(
    "confirm-password",
    confirmPasswordValue,
    "Введите Confirm Password"
  );
}

document.querySelector("form").onsubmit = function (event) {
  const nameValue = document.getElementById("username").value;
  const nameIsValid = checkValid("username", nameValue, "Введите username");

  const emailValue = document.getElementById("email").value;
  const emailIsValid = checkEmail(emailValue);

  const passwordValue = document.getElementById("password").value;
  const passwordIsValid = checkValid(
    "password",
    passwordValue,
    "Введите пароль"
  );

  const confirmPasswordValue =
    document.getElementById("confirm-password").value;
  const confirmPasswordValueIsValid = checkConfirmPassword(
    confirmPasswordValue,
    passwordValue
  );

  const isValid =
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordValueIsValid;

  if (!isValid) {
    event.preventDefault();
  }
else{
  const formData = {
    username: nameValue,
    email: emailValue,
    password: passwordValue,
    confirmPassword: confirmPasswordValue,
  };

  // Отправка данных на сервер
  fetch("http://localhost:3000/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при отправке данных на сервер");
      }
      return response.json();
    })
    .then((data) => {
      alert("Данные успешно отправлены");
      // Здесь можно добавить дополнительные действия после успешной отправки
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
  }
};

function setError(fieldId, message) {
  document.getElementById(fieldId).nextElementSibling.textContent = message;
}
function clearError(fieldId) {
  document.getElementById(fieldId).nextElementSibling.textContent = "";
}
