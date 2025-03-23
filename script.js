rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

// Importando Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_ID",
    appId: "SUA_APP_ID"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const adminUsername = "@admin";
const adminPassword = "2025";

// Função para obter os usuários do localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};  // Retorna os usuários ou um objeto vazio caso não existam
}

document.addEventListener("DOMContentLoaded", function() {
    // Lógica de login
    async function loginUser(username, password) {
        if (username === "@admin" && password === "2025") {
            window.location.href = "admin.html";
            return;
        }
    
        const userRef = doc(db, "users", username);
        const userSnap = await getDoc(userRef);
    
        if (userSnap.exists() && userSnap.data().password === password) {
            window.location.href = "AM.html";
        } else {
            document.getElementById("error-message").textContent = "Usuário ou senha inválidos!";
        }
    }
    
    // Evento de login
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        loginUser(username, password);
    });
    
        // Verifica se o login é para o admin
        if (username === adminUsername && password === adminPassword) {
            window.location.href = "admin.html";  // Redireciona para o painel de admin
        }
        // Verifica se o usuário e a senha são válidos no localStorage
        else {
            const users = getUsers();
            if (users[username] && users[username] === password) {
                alert("Login bem-sucedido!");
                window.location.href = "AM.html";  // Redireciona para o AM.html do usuário comum
            } else {
                errorMessage.textContent = "Usuário ou senha inválidos!";
                errorMessage.style.color = "red";
            }
        }
    });
});
