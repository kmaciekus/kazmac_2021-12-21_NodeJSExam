import { displayGroups } from "./display.js";
import { getData, addItemObject } from "./fetch.js";
import { URL_ACCOUNTS, addGroupForm } from "./variables.js";
const token = sessionStorage.getItem("token");
const main = async() => {
    try {
        const {groups} = await getData(URL_ACCOUNTS, token);
        displayGroups(groups);
    } catch (error) {
        console.log(error);
    }
}

addGroupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await addItemObject(addGroupForm, URL_ACCOUNTS, token);
    addGroupForm.reset();
    main();
});
main();