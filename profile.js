// let user =
//     getCurrentUser();


// if (!user) {

//     window.location.href =
//         "login.html";

// }



// function loadProfile() {

//     document.getElementById(
//         "profileName"
//     ).value =
//         user.name;


//     document.getElementById(
//         "profileEmail"
//     ).value =
//         user.email;


//     document.getElementById(
//         "profileDisplayName"
//     ).textContent =
//         user.name;


//     document.getElementById(
//         "profileDisplayEmail"
//     ).textContent =
//         user.email;


//     document.getElementById(
//         "profileAvatar"
//     ).textContent =
//         user.name
//             .charAt(0)
//             .toUpperCase();

// }



// const profileForm =
//     document.getElementById(
//         "profileForm"
//     );


// profileForm?.addEventListener(
//     "submit",
//     function(event) {

//         event.preventDefault();


//         const name =
//             document.getElementById(
//                 "profileName"
//             ).value.trim();


//         const email =
//             document.getElementById(
//                 "profileEmail"
//             ).value.trim();


//         if (!name || !email) {

//             return;

//         }


//         user.name =
//             name;


//         user.email =
//             email;



//         localStorage.setItem(
//             "todoCurrentUser",
//             JSON.stringify(user)
//         );



//         const users =
//             JSON.parse(
//                 localStorage.getItem(
//                     "todoUsers"
//                 ) || "[]"
//             );


//         const index =
//             users.findIndex(
//                 item =>
//                     item.id === user.id
//             );


//         if (index !== -1) {

//             users[index] =
//                 user;

//         }


//         localStorage.setItem(
//             "todoUsers",
//             JSON.stringify(users)
//         );



//         const message =
//             document.getElementById(
//                 "profileMessage"
//             );


//         message.textContent =
//             "Profile updated successfully.";


//         message.className =
//             "form-message success";


//         loadProfile();

//     }
// );


// loadProfile();
