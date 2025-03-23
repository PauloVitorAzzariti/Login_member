const adminUsername = "@admin";
const adminPassword = "2025";

// Função para obter os usuários do localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};  // Retorna os usuários ou um objeto vazio caso não existam
}

document.addEventListener("DOMContentLoaded", function() {
    // Lógica de login
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");

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
