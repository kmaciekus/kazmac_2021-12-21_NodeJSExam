import { URL_USERS, logInForm } from "./variables.js";
import { login } from "./fetch.js";
logInForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = [...new FormData(logInForm)];
        const {email, password} = Object.fromEntries(form);
        await login(email, password, URL_USERS);
});