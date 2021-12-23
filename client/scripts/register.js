import { addItemObject } from "./fetch.js";
import { registrationForm, URL_USERS } from "../scripts/variables.js";

const passwordCheck = async (inputData) => {
  const data = new FormData(inputData);
  const pass1 = data.get("password");
  const pass2 = data.get("repeatPassword");
  if (pass1 !== pass2) {
    alert("Password doesn't match!");
  } else {
    await addItemObject(inputData, `${URL_USERS}/register`);
    window.location.pathname = "client/index.html";
  }
};
registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await passwordCheck(registrationForm);
});
