import { displayGroups } from "./display.js";
import { getData } from "./fetch.js";
import { URL_ACCOUNTS } from "./variables.js";
const main = async() => {
    const token = sessionStorage.getItem("token");
    try {
        const {groups} = await getData(URL_ACCOUNTS, token);
        console.log(groups)
        displayGroups(groups);
        console.log(document.getElementById("5").id)
    } catch (error) {
        console.log(error);
    }
}

main();