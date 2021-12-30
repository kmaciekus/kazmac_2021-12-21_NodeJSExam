import { tableBody } from "./variables.js";

const getGroupId = (event) => {
    const groupId = event.currentTarget.id;
    const groupName = event.currentTarget.children[1].innerHTML;
    window.sessionStorage.setItem("groupId", groupId);
    window.sessionStorage.setItem("groupName", groupName);
    window.location.pathname = "client/bills.html";
}

const createCard = (groupId, groupName) => {
    const card = document.createElement("div");
    card.classList = "card";
    card.id=groupId;
    const id = document.createElement("h2");
    id.innerText=`ID: ${groupId}`;
    const name = document.createElement("p");
    name.innerText=groupName;
    card.append(id, name);
    card.addEventListener("click", (e) => {
        getGroupId(e);
    });
    return card;
}
 
export const displayGroups = (list) => {
    if (!list) {
        return cardWrapper.innerHTML = "No data";
    }
    cardWrapper.innerHTML = "";
    const cards = list.map(element => {
        return createCard(element.groupId, element.groupName);
    });
    cardWrapper.append(...cards);
};

const createTRow = (id, description, amount) => {
    const tRow = document.createElement("tr");
    const billId = document.createElement("td");
    billId.innerHTML = id;
    const billdescription = document.createElement("td");
    billdescription.innerHTML = description;
    const billamount = document.createElement("td");
    billamount.innerHTML = `$ ${amount}`;
    tRow.append(billId, billdescription, billamount);
    return tRow;
}

export const displayBills = (list) => {
    if (!list) {
        return tableBody.innerHTML = "No data";
    }
    tableBody.innerHTML = "";
    const rows = list.map(element => {
        return createTRow(element.id, element.description, element.amount);
    });
    tableBody.append(...rows);
}

export const errorDisplay = (errors) => {
    const errorList = errors.map((item) => {
        console.log(item);
        return `${item.param}: ${item.msg}`;
    });
    return errorList;
};



