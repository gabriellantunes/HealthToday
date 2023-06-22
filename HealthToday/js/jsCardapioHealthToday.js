document.addEventListener('DOMContentLoaded', (event) => {
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

        document.getElementById('cafe-da-manha-button').click(); 
    } else {
        window.location.href = 'login.html';
    }
});

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

$(function() {
    $("#datepicker").datepicker({
        dateFormat: 'dd/mm/yy',
        onSelect: function(dateText) {
            document.getElementById('selected-date').innerText = "Data selecionada: " + dateText;
            loadMealPlan(dateText); // Adicionado aqui
        }
    }).datepicker("show");
});



/*
function loadMealPlan(date) {
    let currentUser = localStorage.getItem('currentUser');
    let mealPlans = JSON.parse(localStorage.getItem(currentUser + '-meal-plans')) || {};

    let mealPlan = mealPlans[date];
    if (mealPlan) {
        document.getElementById('cafe-da-manha-content').value = mealPlan["Café da Manhã"] || '';
        document.getElementById('almoco-content').value = mealPlan["Almoço"] || '';
        document.getElementById('cafe-da-tarde-content').value = mealPlan["Café da Tarde"] || '';
        document.getElementById('janta-content').value = mealPlan["Janta"] || '';
    } else {
        document.getElementById('cafe-da-manha-content').value = '';
        document.getElementById('almoco-content').value = '';
        document.getElementById('cafe-da-tarde-content').value = '';
        document.getElementById('janta-content').value = '';
    }
}
*/
function loadMealPlan(date) {
    let mealPlans = JSON.parse(localStorage.getItem('meals')) || {};

    let mealPlan = mealPlans[date];
    if (mealPlan) {
        document.getElementById('cafe-da-manha-content').value = mealPlan["cafe-da-manha"] || '';
        document.getElementById('almoco-content').value = mealPlan["almoco"] || '';
        document.getElementById('cafe-da-tarde-content').value = mealPlan["cafe-da-tarde"] || '';
        document.getElementById('janta-content').value = mealPlan["janta"] || '';
    } else {
        // Se não houver plano de refeições para a data selecionada, você pode escolher preencher com um valor padrão ou deixar em branco
    }
}






const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');
const arrows = document.querySelectorAll('.arrow');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        if (contents[index].style.display === 'block') { 
            contents[index].style.display = 'none';
            arrows[index].innerHTML = '&#x2B9F;'; // Se o conteúdo já estiver visível, esconda-o e mude a seta para apontar para baixo
        } else {
            contents.forEach(content => content.style.display = 'none');
            arrows.forEach(arrow => arrow.innerHTML = '&#x2B9F;'); // Mude todas as setas para apontar para baixo
            contents[index].style.display = 'block';
            arrows[index].innerHTML = '&#x2B9D;'; // Se o conteúdo estiver escondido, mostre-o e mude a seta para apontar para cima
        }
    });
});

const datePicker = $("#datepicker");
const tabsContent = document.querySelectorAll('.tab-content');
const saveMenuBtn = document.getElementById('save-menu-btn');

let menus = JSON.parse(localStorage.getItem('menus')) || {};

saveMenuBtn.addEventListener('click', () => {
    let selectedDate = datePicker.datepicker("getDate");

    if (!selectedDate) {
        alert('Por favor, selecione uma data!');
        return;
    }

    let formattedDate = $.datepicker.formatDate('yy-mm-dd', selectedDate);

    menus[formattedDate] = {
        cafeDaManha: tabsContent[0].value,
        almoco: tabsContent[1].value,
        cafeDaTarde: tabsContent[2].value,
        janta: tabsContent[3].value
    };

    localStorage.setItem('menus', JSON.stringify(menus));

    alert('Cardápio salvo com sucesso!');
});



/*
datePicker.datepicker({
    dateFormat: 'dd/mm/yy',
    onSelect: function(dateText) {
        document.getElementById('selected-date').innerText = "Data selecionada: " + dateText;

        let selectedDate = $(this).datepicker("getDate");

        let formattedDate = $.datepicker.formatDate('yy-mm-dd', selectedDate);
        if (menus[formattedDate]) {
            tabsContent[0].value = menus[formattedDate].cafeDaManha || '';
            tabsContent[1].value = menus[formattedDate].almoco || '';
            tabsContent[2].value = menus[formattedDate].cafeDaTarde || '';
            tabsContent[3].value = menus[formattedDate].janta || '';
        } else {
            tabsContent.forEach(tabContent => tabContent.value = '');
        }
    }
}).datepicker("show");
*/
$("#datepicker").datepicker({
    dateFormat: 'yy-mm-dd',
    onSelect: function(dateText) {
        document.getElementById('selected-date').innerText = "Data selecionada: " + dateText;
        loadMealPlan(dateText);  // Carrega as refeições para a data selecionada
    }
}).datepicker("show");






const addPrefix = (textarea) => {
    textarea.value = "• " + textarea.value.replace(/\n/g, "\n• ");
}

const removePrefix = (textarea) => {
    textarea.value = textarea.value.replace(/• /g, "");
}

const textareas = document.querySelectorAll('.tab-content');

document.querySelectorAll('.tab-content').forEach(textarea => {
    textarea.addEventListener('change', function() {
        saveMealPlans();
    });
});


textareas.forEach(textarea => {
    textarea.addEventListener('focus', function() {
        if (!this.value) {
            this.value = "• ";
        }
    });

    textarea.addEventListener('input', function() {
        if (this.value.endsWith("\n")) {
            this.value += "• ";
        }
    });
});

function saveMealPlans() {
    let selectedDate = document.getElementById('selected-date').innerText.split(': ')[1];
    if (selectedDate === "Nenhuma") {
        alert("Por favor, selecione uma data primeiro.");
        return;
    }

    let currentUser = localStorage.getItem('currentUser');
    let mealPlans = JSON.parse(localStorage.getItem(currentUser + '-meal-plans')) || {};

    mealPlans[selectedDate] = {
        "Café da Manhã": document.getElementById('cafe-da-manha-content').value,
        "Almoço": document.getElementById('almoco-content').value,
        "Café da Tarde": document.getElementById('cafe-da-tarde-content').value,
        "Janta": document.getElementById('janta-content').value,
    };

    localStorage.setItem(currentUser + '-meal-plans', JSON.stringify(mealPlans));

    alert('Plano de refeições salvo com sucesso!');
}
document.addEventListener("DOMContentLoaded", function() {
    let mealPlan = JSON.parse(localStorage.getItem('mealPlan')) || {};

    function fillTextarea(date) {
        const mealForTheDay = mealPlan[date] || {};
        document.querySelector('#breakfast-textarea').value = mealForTheDay.breakfast || defaultTextareaValue;
        document.querySelector('#lunch-textarea').value = mealForTheDay.lunch || defaultTextareaValue;
        document.querySelector('#afternoonCoffee-textarea').value = mealForTheDay.afternoonCoffee || defaultTextareaValue;
        document.querySelector('#dinner-textarea').value = mealForTheDay.dinner || defaultTextareaValue;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    fillTextarea(currentDate);

    document.querySelector('#save-button').addEventListener('click', function() {
        const selectedDate = document.querySelector('#date-picker').value;
        mealPlan[selectedDate] = {
            breakfast: document.querySelector('#breakfast-textarea').value,
            lunch: document.querySelector('#lunch-textarea').value,
            afternoonCoffee: document.querySelector('#afternoonCoffee-textarea').value,
            dinner: document.querySelector('#dinner-textarea').value
        };
        localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
        fillTextarea(selectedDate);
    });

    document.querySelector('#date-picker').addEventListener('change', function() {
        fillTextarea(this.value);
    });
});

$(document).ready(function() {
    var meals = {
        '01-06-2023': {
            cafeDaManha: 'Café da manhã para o dia 01-06-2023',
            almoco: 'Almoço para o dia 01-06-2023',
            cafeDaTarde: 'Café da tarde para o dia 01-06-2023',
            janta: 'Janta para o dia 01-06-2023'
        },
        // ... Mais refeições ...
    };
    
    $("#datepicker").datepicker({
        dateFormat: 'dd-mm-yy',
        onSelect: function(dateText) {
            var selectedMeals = meals[dateText];
            if (selectedMeals) {
                $("#cafe-da-manha-content").text(selectedMeals.cafeDaManha);
                $("#almoco-content").text(selectedMeals.almoco);
                $("#cafe-da-tarde-content").text(selectedMeals.cafeDaTarde);
                $("#janta-content").text(selectedMeals.janta);
            }
        }
    });

    $('#save-button').click(function() {
        if ($("#datepicker").datepicker("getDate") === null) {
            alert("Ops.. Você não selecionou uma data, a data atual sempre é demorada apenas para fins de visualização");
            return false;
        } else {
            var text = $('#your-textarea-id').val();
            console.log(text);
        }
    });
});

// Alocar refeições aleatórias para todos os dias do mês
var meals = {};

for (let day = 1; day <= 30; day++) {
  let date = '06-2023-' + (day < 10 ? '0' : '') + day;
  meals[date] = {
    'cafe-da-manha': 'Café da manhã para o dia ' + date,
    'almoco': 'Almoço para o dia ' + date,
    'cafe-da-tarde': 'Café da tarde para o dia ' + date,
    'janta': 'Janta para o dia ' + date,
  };
}


// Armazena as refeições no localStorage
localStorage.setItem('meals', JSON.stringify(meals));

$( function() {
    $('#datepicker').datepicker({
        dateFormat: "dd-mm-yy",
        onSelect: function(dateText) {
            // Convertemos a data para um objeto Date do JavaScript
            var selectedDate = $.datepicker.parseDate("dd-mm-yy", dateText);

            // Checamos se a data selecionada é 1 de junho
            if (selectedDate.getDate() === 1 && selectedDate.getMonth() === 5) {
                // Preenchemos os campos de texto com algumas refeições fictícias
                $('#cafe-da-manha-content').text("Café, torrada, frutas");
                $('#almoco-content').text("Frango grelhado, arroz, feijão, salada");
                $('#cafe-da-tarde-content').text("Iogurte, frutas");
                $('#janta-content').text("Peixe assado, purê de batata, legumes");
            } else {
                // Se a data selecionada não é 1 de junho, limpamos os campos de texto
                $('#cafe-da-manha-content').text("111111");
                $('#almoco-content').text("111111");
                $('#cafe-da-tarde-content').text("1111111");
                $('#janta-content').text("111111111");
            }
        }
    });
});
