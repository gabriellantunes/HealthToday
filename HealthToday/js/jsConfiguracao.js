window.onload = function () {
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'error.html';
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === currentUser);

    if (user) {
        document.getElementById('welcome-message').textContent = `Olá, ${user.name}!`;

        // Definir a imagem do usuário
        let userPic = localStorage.getItem(currentUser + 'profilePic');
        if (userPic) {
            document.querySelector('.user-icon').src = userPic;
            document.querySelector('#user-icon-menu').src = userPic;
        }
    } else {
        window.location.href = 'login.html';
    }
};

var isMenuOpen = false;

document.getElementById('menu-trigger').onclick = function () {
    var arrow = document.querySelector('.down-arrow');
    if (isMenuOpen) {
        document.getElementById('mySidenav').style.height = "0";
        isMenuOpen = false;
        arrow.style.transform = "";
    } else {
        document.getElementById('mySidenav').style.height = "100vh";
        isMenuOpen = true;
        arrow.style.transform = "rotate(180deg)";
    }
};

document.addEventListener('click', function (event) {
    var isClickInside = document.getElementById('mySidenav').contains(event.target);
    var isClickOnIcon = document.getElementById('menu-trigger').contains(event.target);

    if (!isClickInside && !isClickOnIcon) {
        var arrow = document.querySelector('.down-arrow');
        document.getElementById('mySidenav').style.height = "0";
        isMenuOpen = false;
        arrow.style.transform = "";
    }
});

function logout() {
    alert("Usuário desconectado com sucesso");
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}