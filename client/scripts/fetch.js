// import { errorDisplay, getAndDisplayPetData } from "./display.js";
// import { URL_PET } from "./variables.js";

export const getData = async (URL, token) => {
    try {
        const data = await fetch(URL, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        // console.log(data);
        if (data.status === 403) {
            window.location.pathname = "client/index.html";
        }
        const dataJSON = data.json();
        return dataJSON;
    } catch (error) {
        alert(`${error}`);
    }
};

const postNewItem = async (itemObject, URL, token) => {
    if (!token) {
        try {
            const response = await fetch(`${URL}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(itemObject),
            });
            const responseJSON = await response.json();
            if (!response.ok) {
                console.log(responseJSON)
                throw new Error(errorDisplay(responseJSON.errors));
    
            } else {
                return alert("Successfully registered!");
            }
        } catch (error) {
            console.error(error);
            return alert(`${error}`);
        }
    }
    try {
        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(itemObject),
        });
        const responseJSON = await response.json();
        if (!response.ok) {
            console.log(responseJSON)
            throw new Error(errorDisplay(responseJSON.errors));

        } else {
            return alert("Successfully registered!");
        }
    } catch (error) {
        console.error(error);
        return alert(`${error}`);
    }
};

export const addItemObject = async (inputData, URL, token) => {
    const data = [...new FormData(inputData)];
    const newObject = Object.fromEntries(data);
    try {
        await postNewItem(newObject, URL, token);
    } catch (error) {
        console.error(error);
    }
};

export const login = async (email, password, URL) => {
    try {
        const response = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data.error) throw new Error(data.error);

        sessionStorage.setItem("token", data.token);
        window.location.pathname = "client/accounts.html"
        // navigate("posts/posts");http://127.0.0.1:5501/client/accounts.html
    } catch (error) {
        console.error(error);
    }
};

// const updateItem = async (itemId, URL, token) => {
//     const response = await fetch(`${URL}/${itemId}`, {
//         method: 'DELETE',
//         headers: {
//             authorization: `Bearer ${token}`,
//         },
//     });

//     const deleteJSON = await response.json();
//     return deleteJSON;
// };

// export const archivePet = async (event) => {
//     const petId = event.target.id;
//     const token = sessionStorage.getItem("token");
//     const yes = confirm(
//         "Ar tikrai norite archivuoti pacientą?"
//     )
//     if (yes) {
//         await updateItem(petId, URL_PET, token);
//         await getAndDisplayPetData();
//     }
// };
