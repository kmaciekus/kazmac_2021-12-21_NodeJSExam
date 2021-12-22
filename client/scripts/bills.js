import { getData,addItemObject } from "./fetch.js";
import { URL_BILLS, addBillForm, billGroupTitle, groupIdInput } from "./variables.js";
import { displayBills } from "./display.js";
const token = sessionStorage.getItem("token");
const groupId = window.sessionStorage.getItem("groupId");
const groupName = window.sessionStorage.getItem("groupName");
groupIdInput.value = groupId;
const main = async() => {
    billGroupTitle.innerHTML=`${groupName}:`;
    try {
        const {bills} = await getData(`${URL_BILLS}/${groupId}`, token);
        displayBills(bills);
    } catch (error) {
        console.log(error);
    }
}

addBillForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    await addItemObject(addBillForm, URL_BILLS, token);
    addBillForm.reset();
    main();
})

main();