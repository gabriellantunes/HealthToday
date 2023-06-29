window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'error.html';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === currentUser);

    if (user) {
        let userPic = localStorage.getItem(currentUser + 'profilePic');
        if (userPic) {
            document.querySelector('.user-icon').src = userPic;
            document.querySelector('#user-icon-menu').src = userPic;
        }

        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('password').value = user.password;

    } else {
        window.location.href = 'login.html';
    }

    const savedImage = localStorage.getItem(currentUser + 'profilePic');
    if (savedImage) {
        document.getElementById('preview').style.display = 'block';
        document.getElementById('preview').src = savedImage;
    }

    if (user) {
        document.getElementById('greeting').textContent = 'Olá, ' + user.name;
    }

    const activeTab = localStorage.getItem('activeTab'); 
    if (activeTab) {
        document.getElementById(activeTab).style.display = "block";
        document.querySelector(`.tablinks[data-tab="${activeTab}"]`);
    }
}

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

const currentUser = localStorage.getItem('currentUser'); 
const users = JSON.parse(localStorage.getItem('users')) || [];
const user = users.find(user => user.email === currentUser);

document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const file = document.getElementById('profile-pic').files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        localStorage.setItem(currentUser + 'profilePic', reader.result); 
        document.getElementById('preview').style.display = 'block';
        document.getElementById('preview').src = reader.result;
        alert("Imagem alterada com sucesso");
        window.location.reload();
    }
    if (file) {
        reader.readAsDataURL(file);
    }
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    localStorage.setItem('activeTab', tabName);
}

const savedImage = localStorage.getItem(currentUser + 'profilePic');
const previewImage = document.getElementById('preview');
const defaultAvatar = document.getElementById('default-avatar');

if (savedImage) {
    defaultAvatar.style.display = 'none';
    previewImage.style.display = 'block';
    previewImage.src = savedImage;
} else {
    defaultAvatar.style.display = 'block';
    previewImage.style.display = 'none';
}

document.getElementById('toggle-password').addEventListener('click', function (e) {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('update-btn').addEventListener('click', function() {
    const updatedName = document.getElementById('name').value;
    const updatedEmail = document.getElementById('email').value;
    const updatedPassword = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = users.findIndex(user => user.email === currentUser);

    if (userIndex !== -1) {
        users[userIndex].name = updatedName;
        users[userIndex].email = updatedEmail;
        users[userIndex].password = updatedPassword;
        
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Informações alteradas com sucesso');
        window.location.reload();
    } else {
        alert('Erro ao atualizar as informações do usuário');
    }
});
