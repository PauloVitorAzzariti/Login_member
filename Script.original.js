const users = {};  // Armazenamento dos usuários
const adminUsername = "visitante09661@gmail.com";
const adminPassword = "972207";

// Adiciona um usuário ao sistema
function addUser(username, password) {
    users[username] = password;
}

// Remove um usuário do sistema
function removeUser(username) {
    delete users[username];
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
            window.location.href = "AM.html";  // Redireciona para o painel de admin
        }
    });
});

// Expõe a função de adicionar usuários para o painel de administração
window.addUser = addUser;
window.removeUser = removeUser;

// Função para obter os usuários do localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};  // Retorna os usuários ou um objeto vazio caso não existam
}

// Função para salvar os usuários no localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para adicionar um usuário
function addUser(username, password) {
    const users = getUsers();
    users[username] = password;
    saveUsers(users);
}

// Função para remover um usuário
function removeUser(username) {
    const users = getUsers();
    delete users[username];
    saveUsers(users);
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
            window.location.href = "AM.html";  // Redireciona para o painel de admin
        }
        // Verifica se o usuário e a senha são válidos
        else {
            const users = getUsers();
            if (users[username] && users[username] === password) {
                alert("Login bem-sucedido!");
                window.location.href = "AM.html";  // URL para usuários comuns
            } else {
                errorMessage.textContent = "Usuário ou senha inválidos!";
                errorMessage.style.color = "red";
            }
        }
    });

    // Expõe a função de adicionar usuários para o painel de administração
    window.addUser = addUser;
    window.removeUser = removeUser;
});

