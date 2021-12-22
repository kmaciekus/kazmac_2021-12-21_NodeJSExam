import { tableBody } from "./variables.js";
import { getData } from "./fetch.js";
import { URL_BILLS } from "./variables.js";

const main = async() => {
    const token = sessionStorage.getItem("token");
    const groupId = window.sessionStorage.getItem("groupId");
    console.log(groupId);
    try {
        const {bills} = await getData(`${URL_BILLS}/${groupId}`, token);
        console.log(bills)
        // displayGroups(groups);
    } catch (error) {
        console.log(error);
    }
}

main();