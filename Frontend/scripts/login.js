const submitBtn = document.getElementById("submit");
const emailMsg = document.getElementById("email-msg");
const passMsg = document.getElementById("pass-msg");
let msgValid = "Valid!";
let msgNotValid = "Not valid!";

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("Password").value;
  const checkbox = document.getElementById("checkbox").value;

  let emailValidation =
    /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,8})?$/;
  let passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,9}/;
  if (
    emailValidation.test(email) &&
    passwordValidation.test(password) &&
    checkbox
  ) {
    emailMsg.textContent = msgValid;
    passMsg.textContent = msgValid;
    emailMsg.style.color = "green";
    passMsg.style.color = "green";
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  } else {
    emailMsg.textContent = msgNotValid;
    passMsg.textContent = msgNotValid;
    emailMsg.style.color = "red";
    passMsg.style.color = "red";
  }
});
