import { getData } from "./fetch.js";
import { tableBody } from "./variables.js";
// import { removeBtnClass, addBtnClass } from "./helpers.js";
// import { addPetBtn, addPetForm, URL_PET, cardWrapperLogs, cardWrapperPrescr, mainPageTitle, logPageTitle } from "./variables.js";

// export const errorDisplay = (errors) => {
//     console.log(errors);
//     const errorList = errors.map((item) => {
//         console.log(item);
//         return `${item.param}: ${item.msg}`;
//     });
//     return errorList;
// };

// const createCardTitle = (title) => {
//     const titleHolder = document.createElement("div");
//     const hTitle = document.createElement("h4");
//     hTitle.innerText = title;
//     titleHolder.append(hTitle);
//     titleHolder.classList = "content-wrapper";
//     return titleHolder;
// };

// const createInfoElements = (text1, text2 = "") => {
//     const infoHolder = document.createElement("div");
//     if (text2 !== "") {
//         const pText1 = document.createElement("p");
//         pText1.innerText = text1;
//         const pText2 = document.createElement("p");
//         pText2.innerText = text2;
//         infoHolder.append(pText1, pText2);
//         infoHolder.classList = "content-wrapper";
//         return infoHolder;
//     } else {
//         const pText1 = document.createElement("p");
//         pText1.innerText = text1;
//         infoHolder.append(pText1);
//         infoHolder.classList = "content-wrapper";
//         return infoHolder;
//     }
// };
// const createCardButtons = (id, viewFunction, deleteFunction) => {
//     const buttonElements = document.createElement("div");
//     const viewButton = document.createElement("button");
//     viewButton.innerText = "VIEW LOG";
//     viewButton.id = id;
//     viewButton.classList = "orange button";
//     viewButton.href = "./log.html";
//     viewButton.addEventListener("click",viewFunction);

//     const deleteButton = document.createElement("button");
//     deleteButton.innerText = "DELETE";
//     deleteButton.id = id;
//     deleteButton.classList = "white button";
//     deleteButton.addEventListener("click", deleteFunction);

//     buttonElements.append(viewButton, deleteButton);
//     return buttonElements;
// };


const createCard = (groupId, groupName) => {
    const card = document.createElement("div");
    card.classList = "card";
    card.id=groupId;
    const id = document.createElement("h2");
    id.innerText=`ID: ${groupId}`;
    const name = document.createElement("p");
    name.innerText=groupName;
    card.append(id, name);
    card.addEventListener("click", getGroupId(e));
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
    billamount.innerHTML = amount;
    tRow.append(billId, billdescription, billamount);
    return tRow;
}

export const displayBills = (list) => {
    if (!list) {
        return tableBody.innerHTML = "No data";
    }
    tableBody.innerHTML = "";
    const rows = list.map(element => {
        return createTRow(element.groupId, element.groupName);
    });
    tableBody.append(...rows);
}
// export const displayPrescriptionData = (list) => {
//     if (!list) {
//         return cardWrapperPrescr.innerHTML ="No data";
//     }
//     cardWrapperPrescr.innerHTML = "";
//     const cards = list.map(element => {
//         return createCard(element.medsName, `${element.medsDescription}; Usage: ${element.prescriptionComment}`,element.dateIssued);
//     });
//     cardWrapperPrescr.append(...cards);
// };

// export const displayLogData = (list) => {
//     if (!list) {
//         return cardWrapperLogs.innerHTML ="No data";

//     }
//     cardWrapperLogs.innerHTML = "";
//     const cards = list.map(element => {
//         return createCard(element.logStatus, element.logDescription);
//     });
//     cardWrapperLogs.append(...cards);
// };
const getGroupId = (event) => {
    const groupId = event.target.id;
    window.sessionStorage.setItem("groupId", groupId);
    window.location.pathname = "client/bills.html";
}

export const getAndDisplayGroups = async (token) => {
    try {
        const { pets } = await getData(URL_PET, token);
        displayGroups(pets);
    } catch (error) {
        console.error(error);
    }
};

export const addPet = () => {
    addPetBtn.addEventListener("click", () => {
        if (addPetForm.classList.value.includes("is-hidden")) {
            addPetForm.classList.remove("is-hidden");
            cardWrapper.classList.add("is-hidden");
            mainPageTitle.innerText = "Add Pet";
        }
    });
};

export const addPrescrOrLog = (event) => {
    const form = document.getElementById(event.target.value);
    const id = event.target.id;
    const title = `${id.slice(0, 2).toUpperCase()} ${id.slice(3, (id.length - 1)).toUpperCase()}`;
    if (form.classList.value.includes("is-hidden")) {
        form.classList.remove("is-hidden");
        cardWrapperPrescr.classList.add("is-hidden");
        cardWrapperLogs.classList.add("is-hidden");
        logPageTitle.innerText = title;
    }
}



export const filterLogsAndPrescriptions = (event, prescriptions, logs) => {
    const targetBtn = event.currentTarget;
    const arrayOfchildren = Array.from(event.currentTarget.parentNode.children);
    const targetWrapper = event.target.dataset.filter;
    const filterControl = arrayOfchildren.filter(ch => ch.classList.value.includes("orange")).length;
    const isActive = targetBtn.classList.value.includes("orange");
    if (targetBtn.innerHTML === "LOGS ✔" || targetBtn.innerHTML === "LOGS") {
        if (isActive & filterControl === 2) {
            eval(targetWrapper).innerHTML = "";
            removeBtnClass(targetBtn);
            displayPrescriptionData(prescriptions);
        } else if (isActive & filterControl === 1) {
            eval(targetWrapper).innerHTML = "";
            removeBtnClass(targetBtn);
        } else {
            addBtnClass(targetBtn);
            displayLogData(logs);
        }
    } else {
        if (isActive & filterControl === 2) {
            eval(targetWrapper).innerHTML = "";
            removeBtnClass(targetBtn);
            displayLogData(logs);
        } else if (isActive & filterControl === 1) {
            eval(targetWrapper).innerHTML = "";
            removeBtnClass(targetBtn);
        } else {
            addBtnClass(targetBtn);
            displayPrescriptionData(prescriptions);
        }
    }
};

