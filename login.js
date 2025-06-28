// login2.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAWECeIjM6ZRhtUwPJ4gFWsNm91OZeBMk8",
    authDomain: "hackathon-14213.firebaseapp.com",
    projectId: "hackathon-14213",
    storageBucket: "hackathon-14213.firebasestorage.app",
    messagingSenderId: "762337747423",
    appId: "1:762337747423:web:37599a030132f37621a46a",
    measurementId: "G-P007PF2H8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login logic
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ✅ Login successful, redirect
      window.location.href = "index.html"; // Make sure `main.html` exists in your project
    })
    .catch((error) => {
      alert("❌ Login failed: " + error.message);
    });
});

    