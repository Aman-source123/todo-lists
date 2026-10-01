// function getCurrentUser() {

//     return JSON.parse(
//         localStorage.getItem(
//             "todoCurrentUser"
//         ) || "null"
//     );

// }



// function requireAuth() {

//     const user =
//         getCurrentUser();


//     if (!user) {

//         window.location.href =
//             "login.html";

//         return null;

//     }


//     return user;

// }



// function logout() {

//     localStorage.removeItem(
//         "todoCurrentUser"
//     );


//     window.location.href =
//         "login.html";

// }



function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    localStorage.setItem(
        "todoDarkMode",
        document.body.classList.contains(
            "dark"
        )
    );

}



function loadTheme() {

    const dark =
        localStorage.getItem(
            "todoDarkMode"
        ) === "true";


    if (dark) {

        document.body.classList.add(
            "dark"
        );

    }

}



function toggleSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (sidebar) {

        sidebar.classList.toggle(
            "show"
        );

    }

}



function escapeHTML(value) {

    return String(
        value || ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}



function getToday() {

    const date =
        new Date();


    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(
        date.getDate()
    ).padStart(2, "0")}`;

}



function isOverdue(task) {

    return (

        !task.completed &&

        task.dueDate &&

        task.dueDate < getToday()

    );

}



function getTasks() {

    return JSON.parse(
        localStorage.getItem(
            "todoTasksPro"
        ) || "[]"
    );

}



function saveTasks(tasks) {

    localStorage.setItem(
        "todoTasksPro",
        JSON.stringify(tasks)
    );

}



loadTheme();

requireAuth();
