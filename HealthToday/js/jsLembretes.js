let reminderBeingEdited = null;
let reminders = [];

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

    reminders = loadReminders();
    showReminders();
    showExpiredReminders();
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

function showReminders() {
    var remindersList = document.getElementById("reminders-list");
    remindersList.innerHTML = "";

    for (let i = 0; i < reminders.length; i++) {
        var li = document.createElement("li");

        var strong = document.createElement("strong");
        strong.textContent = "Lembrete " + (i + 1) + ": ";
        li.appendChild(strong);

        var textNode = document.createTextNode(reminders[i].text + " - " + formatDate(reminders[i].date));
        li.appendChild(textNode);

        var editButton = document.createElement("button");
        editButton.textContent = "Editar";
        var reminderDate = new Date(reminders[i].date);
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (reminderDate < currentDate) {
            editButton.disabled = true;
        }
        editButton.onclick = function() { 
            if (confirm("Você tem certeza que deseja editar este lembrete?")) {
                alert("Após a edição do lembrete em questão clique em "+"'Atualizar Lembrete' para concluir sua alteração.")
                startEditing(i);
            }
        };
        li.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = function() { 
            deleteReminder(i); 
        };
        li.appendChild(deleteButton);

        remindersList.appendChild(li);
    }
}

function loadReminders() {
    let currentUser = localStorage.getItem('currentUser');
    reminders = JSON.parse(localStorage.getItem(currentUser + "-reminders")) || [];
    
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    var expiredReminders = [];

    for (let i = 0; i < reminders.length; i++) {
        var reminderDate = new Date(reminders[i].date);
        if (reminderDate < currentDate) {
            expiredReminders.push(reminders[i]);
            reminders.splice(i, 1);
            i--;
        }
    }
    
    localStorage.setItem(currentUser + "-expired-reminders", JSON.stringify(expiredReminders));
    return reminders;
}

function startEditing(index) {
    reminderBeingEdited = index;
    var reminder = reminders[index];

    document.getElementById("reminder-text").value = reminder.text;
    document.getElementById("reminder-date").value = reminder.date;
}

function deleteReminder(index) {
    var confirmDelete = confirm("Você tem certeza de que deseja excluir este lembrete?");

    if (!confirmDelete) {
        return;
    }

    let currentUser = localStorage.getItem('currentUser');

    reminders.splice(index, 1);

    localStorage.setItem(currentUser + "-reminders", JSON.stringify(reminders));

    showReminders();

    if (confirmDelete) {
        alert("Lembrete Excluído com Sucesso !!");
    }
}

function addReminder() {
    event.preventDefault();

    var text = document.getElementById("reminder-text").value;
    var date = document.getElementById("reminder-date").value;

    if (!text || !date) {
        return;
    }

    let currentUser = localStorage.getItem('currentUser');

    if (reminderBeingEdited !== null) {

        reminders[reminderBeingEdited].text = text;
        reminders[reminderBeingEdited].date = date;
    
        alert("Lembrete Editado com Sucesso !!");
        location.reload();
    
        reminderBeingEdited = null;
    } else {
        var newReminder = { text: text, date: date };
    
        reminders.push(newReminder);
    
        alert("Lembrete Adicionado com Sucesso !!");
        location.reload();
    }
    
    localStorage.setItem(currentUser + "-reminders", JSON.stringify(reminders));
    
    reminders = loadReminders();
    showReminders();

    document.getElementById("reminder-form").reset();
}

document.getElementById('reminder-form').addEventListener('submit', addReminder);

function formatDate(date) {
    var parts = date.split('-');
    return parts[2] + '/' + parts[1] + '/' + parts[0];
}

function showExpiredReminders() {
    var expiredRemindersList = document.getElementById("expired-reminders-list");

    expiredRemindersList.innerHTML = "";

    let currentUser = localStorage.getItem('currentUser');
    var reminders = JSON.parse(localStorage.getItem(currentUser + "-reminders"));

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Ignorar a hora, apenas comparar as datas
    var expiredReminders = JSON.parse(localStorage.getItem(currentUser + "-expired-reminders")) || [];

    for (let i = 0; i < expiredReminders.length; i++) {
        var li = document.createElement("li");

        var strong = document.createElement("strong");
        strong.textContent = "Lembrete " + (i + 1) + ": ";
        li.appendChild(strong);

        var textNode = document.createTextNode(expiredReminders[i].text + " - " + formatDate(expiredReminders[i].date));
        li.appendChild(textNode);

        expiredRemindersList.appendChild(li);
    }
}
