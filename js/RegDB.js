﻿import { auth, db } from "./firebaseConfig.mjs";

import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

console.log(db);

async function register(event) {
  const email = document.getElementById("Email_TextBox").value;
  const password = document.getElementById("Password_TextBox").value;
  const username = document.getElementById("Username_TextBox").value;
  event.preventDefault();

  console.log(email, password, username);

  try {
    const authData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await set(ref(db, `users/${authData.user.uid}`), {
      username,
      email,
      password,
    });

    alert("Registration Successful!");
    window.location.href = "/html/Login.html";
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert(error.code);
  }
}

document
  .getElementById("Register_Button")
  .addEventListener("click", function (event) {
    register(event);
  });
