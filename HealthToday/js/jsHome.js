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

        let userPic = localStorage.getItem(currentUser + 'profilePic');
        if (userPic) {
            document.querySelector('.user-icon').src = userPic;
            document.querySelector('#user-icon-menu').src = userPic;
        }
    } else {
        window.location.href = 'login.html';
    }
    var reminders = getReminders(currentUser); 
    showUnexpiredReminders(reminders);
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



function getReminders(currentUser) {
    return JSON.parse(localStorage.getItem(currentUser + "-reminders")) || [];
}

function showUnexpiredReminders(reminders) {
    var remindersList = document.getElementById("reminders-list");

    remindersList.innerHTML = "";

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Ignorar a hora, apenas comparar as datas

    if (reminders.length === 0) {
        var li = document.createElement("li");
        li.textContent = "Atualmente você não possui lembretes,";

        var link = document.createElement("a");
        link.href = "lembretes.html";
        link.textContent = "utilize nosso recurso ";
        link.className = "reminder-link";  // Adicione a classe aqui
        
        var icon = document.createElement("i");
        icon.className = "fas fa-external-link-alt reminder-icon"; // Alteramos a classe do ícone aqui
        link.appendChild(icon);
        
        li.appendChild(link);
        
        remindersList.appendChild(li);
        return;
    }

    for (let i = 0; i < reminders.length; i++) {
        var reminderDate = new Date(reminders[i].date);

        if (reminderDate >= currentDate) {
            var li = document.createElement("li");

            var strong = document.createElement("strong");
            strong.textContent = "Lembrete " + (i + 1) + ": ";
            li.appendChild(strong);

            var textNode = document.createTextNode(reminders[i].text + " - " + formatDate(reminders[i].date));
            li.appendChild(textNode);

            remindersList.appendChild(li);
        }
    }
}

function formatDate(date) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function showReminders(reminders) {
    var remindersList = document.getElementById("reminders-list");

    remindersList.innerHTML = "";

    for (let i = 0; i < reminders.length; i++) {
        var li = document.createElement("li");

        var strong = document.createElement("strong");
        strong.textContent = "Lembrete " + (i + 1) + ": ";
        li.appendChild(strong);

        var textNode = document.createTextNode(reminders[i].text + " - " + formatDate(reminders[i].date));
        li.appendChild(textNode);

        remindersList.appendChild(li);
    }
}
