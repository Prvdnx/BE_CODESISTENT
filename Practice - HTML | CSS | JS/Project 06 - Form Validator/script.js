// dom elements
const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const validations = [
    checkRequired([username, email, password, confirmPassword]),
    checkLength(username, 3, 15),
    checkEmail(email),
    checkLength(password, 6, 25),
    checkPasswordsMatch(password, confirmPassword)
  ];
  
  if (validations.every(v => v)) {
    alert("Registration successful!");
    form.reset();
    document.querySelectorAll(".form-group").forEach(g => g.className = "form-group");
  }
});

// check if passwords match
const checkPasswordsMatch = (input1, input2) =>
  input1.value === input2.value ? true : (setStatus(input2, "error", "Passwords do not match"), false);

// validate email format
const checkEmail = (input) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  setStatus(input, isValid ? "success" : "error", isValid ? "" : "Email is not valid");
  return isValid;
};

// check input length
const checkLength = (input, min, max) => {
  const len = input.value.length;
  const name = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  
  return len < min ? (setStatus(input, "error", `${name} must be at least ${min} characters`), false) :
         len > max ? (setStatus(input, "error", `${name} must be less than ${max} characters`), false) :
         (setStatus(input, "success"), true);
};

// check required fields
const checkRequired = (inputs) => {
  let isValid = true;
  inputs.forEach(input => {
    const name = input.id.charAt(0).toUpperCase() + input.id.slice(1);
    input.value.trim() === "" ? (setStatus(input, "error", `${name} is required`), isValid = false) : setStatus(input, "success");
  });
  return isValid;
};

// set input status (success/error)
const setStatus = (input, status, message = "") => {
  input.parentElement.className = `form-group ${status}`;
  if (message) input.parentElement.querySelector("small").innerText = message;
};
