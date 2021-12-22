import { addItemObject } from "./fetch.js";
import { registrationForm, URL_USERS } from "../scripts/variables.js";


registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await addItemObject(registrationForm, `${URL_USERS}/register`);
    window.location.pathname = "client/index.html"
})