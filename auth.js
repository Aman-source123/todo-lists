// function getUsers() {

//     return JSON.parse(
//         localStorage.getItem("todoUsers") || "[]"
//     );

// }


// function saveUsers(users) {

//     localStorage.setItem(
//         "todoUsers",
//         JSON.stringify(users)
//     );

// }



// /* =========================
//    SIGNUP
// ========================= */

// const signupForm =
//     document.getElementById(
//         "signupForm"
//     );


// if (signupForm) {

//     signupForm.addEventListener(
//         "submit",
//         function(event) {

//             event.preventDefault();


//             const name =
//                 document
//                     .getElementById(
//                         "signupName"
//                     )
//                     .value
//                     .trim();


//             const email =
//                 document
//                     .getElementById(
//                         "signupEmail"
//                     )
//                     .value
//                     .trim();


//             const password =
//                 document.getElementById(
//                     "signupPassword"
//                 ).value;


//             const confirm =
//                 document.getElementById(
//                     "signupConfirm"
//                 ).value;


//             const message =
//                 document.getElementById(
//                     "signupMessage"
//                 );


//             if (password !== confirm) {

//                 message.textContent =
//                     "Passwords do not match.";

//                 message.className =
//                     "form-message error";

//                 return;

//             }


//             if (password.length < 6) {

//                 message.textContent =
//                     "Password must contain at least 6 characters.";

//                 message.className =
//                     "form-message error";

//                 return;

//             }


//             const users =
//                 getUsers();


//             const exists =
//                 users.some(
//                     user =>
//                         user.email.toLowerCase()
//                         ===
//                         email.toLowerCase()
//                 );


//             if (exists) {

//                 message.textContent =
//                     "Email already registered.";

//                 message.className =
//                     "form-message error";

//                 return;

//             }


//             const newUser = {

//                 id: Date.now(),

//                 name,

//                 email,

//                 password

//             };


//             users.push(newUser);

//             saveUsers(users);


//             message.textContent =
//                 "Account created successfully!";

//             message.className =
//                 "form-message success";


//             setTimeout(
//                 () => {

//                     window.location.href =
//                         "login.html";

//                 },
//                 1000
//             );

//         }
//     );

// }



// /* =========================
//    LOGIN
// ========================= */

// const loginForm =
//     document.getElementById(
//         "loginForm"
//     );


// if (loginForm) {

//     loginForm.addEventListener(
//         "submit",
//         function(event) {

//             event.preventDefault();


//             const email =
//                 document
//                     .getElementById(
//                         "loginEmail"
//                     )
//                     .value
//                     .trim();


//             const password =
//                 document.getElementById(
//                     "loginPassword"
//                 ).value;


//             const message =
//                 document.getElementById(
//                     "loginMessage"
//                 );


//             const users =
//                 getUsers();


//             const user =
//                 users.find(
//                     item =>
//                         item.email.toLowerCase()
//                         ===
//                         email.toLowerCase()
//                         &&
//                         item.password === password
//                 );


//             if (!user) {

//                 message.textContent =
//                     "Invalid email or password.";

//                 message.className =
//                     "form-message error";

//                 return;

//             }


//             localStorage.setItem(
//                 "todoCurrentUser",
//                 JSON.stringify(user)
//             );


//             window.location.href =
//                 "dashboard.html";

//         }
//     );

// }
