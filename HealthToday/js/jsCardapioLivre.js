/*window.onload = function () {
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

        let today = new Date();
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0'); 
        let year = today.getFullYear();
        let formattedDate = day + '/' + month + '/' + year;

        // Definir o texto do elemento 'selected-date' para a data atual
        document.getElementById('selected-date').innerText = 'Data selecionada: ' + formattedDate;
        
        // Carregar o plano de refeições para a data atual
        loadMealPlan(formattedDate);
    } else {
        window.location.href = 'login.html';
    }
};
*/
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

        // Definir a imagem do usuário
        let userPic = localStorage.getItem(currentUser + 'profilePic');
        if (userPic) {
            document.querySelector('.user-icon').src = userPic;
            document.querySelector('#user-icon-menu').src = userPic;
        }

        // Abre a aba "Café da Manhã" por padrão
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



/*$(function() {
    $("#datepicker").datepicker({
        dateFormat: 'dd/mm/yy', // define o formato da data para dia/mês/ano
        onSelect: function(dateText) {
            document.getElementById('selected-date').innerText = "Data selecionada: " + dateText;
        }
    }).datepicker("show");
}); */
$(function() {
    /* Comente ou remova esta linha para não definir uma data padrão
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    let formattedDate = day + '/' + month + '/' + year;
    */

    /* Comente ou remova esta linha para não mostrar a data selecionada ao carregar a página
    document.getElementById('selected-date').innerText = "Data selecionada: " + formattedDate;
    */

    $("#datepicker").datepicker({
        dateFormat: 'dd/mm/yy', // define o formato da data para dia/mês/ano
        // defaultDate: formattedDate, // remove esta linha para não definir uma data padrão
        onSelect: function(dateText) {
            document.getElementById('selected-date').innerText = "Data selecionada: " + dateText;
        }
    }).datepicker("show");

    // Carregar o plano de refeições do dia atual, se houver
    // loadMealPlan(formattedDate); // Comente ou remova esta linha para não carregar o plano de refeições ao carregar a página
});




/*function loadMealPlan(date) {
    let currentUser = localStorage.getItem('currentUser');
    let mealPlans = JSON.parse(localStorage.getItem(currentUser + '-meal-plans')) || {};

    let mealPlan = mealPlans[date];
    if (mealPlan) {
        document.getElementById('cafe-da-manha-content').value = mealPlan["Café da Manhã"];
        document.getElementById('almoco-content').value = mealPlan["Almoço"];
        document.getElementById('cafe-da-tarde-content').value = mealPlan["Café da Tarde"];
        document.getElementById('janta-content').value = mealPlan["Janta"];
    }
}
*/
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
        // Limpar as caixas de texto se não houver plano de refeições para a data selecionada
        document.getElementById('cafe-da-manha-content').value = '';
        document.getElementById('almoco-content').value = '';
        document.getElementById('cafe-da-tarde-content').value = '';
        document.getElementById('janta-content').value = '';
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

// Obtenha as referências dos elementos da página
const datePicker = $("#datepicker");
const tabsContent = document.querySelectorAll('.tab-content');
const saveMenuBtn = document.getElementById('save-menu-btn');

// Obtenha as informações de cardápio salvas do LocalStorage
let menus = JSON.parse(localStorage.getItem('menus')) || {};

// Quando o botão Salvar Cardápio é clicado
saveMenuBtn.addEventListener('click', () => {
    let selectedDate = datePicker.datepicker("getDate");

    if (!selectedDate) {
        alert('Por favor, selecione uma data!');
        return;
    }

    // Formate a data para uma string no formato yyyy-mm-dd
    let formattedDate = $.datepicker.formatDate('yy-mm-dd', selectedDate);

    // Salve o cardápio para a data selecionada
    menus[formattedDate] = {
        cafeDaManha: tabsContent[0].value,
        almoco: tabsContent[1].value,
        cafeDaTarde: tabsContent[2].value,
        janta: tabsContent[3].value
    };

    // Salve as informações do cardápio no LocalStorage
    localStorage.setItem('menus', JSON.stringify(menus));

    alert('Cardápio salvo com sucesso!');
});

// Quando uma data é selecionada
datePicker.datepicker({
    dateFormat: 'dd/mm/yy',
    onSelect: function(dateText) {
        document.getElementById('selected-date').innerText = "Data selecionada: " + dateText;

        // Obtenha a data selecionada
        let selectedDate = $(this).datepicker("getDate");

        // Formate a data para uma string no formato yyyy-mm-dd
        let formattedDate = $.datepicker.formatDate('yy-mm-dd', selectedDate);

        // Verifique se existem informações de cardápio salvas para a data selecionada
        if (menus[formattedDate]) {
            // Se houver, preencha as abas com as informações salvas
            tabsContent[0].value = menus[formattedDate].cafeDaManha || '';
            tabsContent[1].value = menus[formattedDate].almoco || '';
            tabsContent[2].value = menus[formattedDate].cafeDaTarde || '';
            tabsContent[3].value = menus[formattedDate].janta || '';
        } else {
            // Se não, limpe as abas
            tabsContent.forEach(tabContent => tabContent.value = '');
        }
    }
}).datepicker("show");

const addPrefix = (textarea) => {
    textarea.value = "• " + textarea.value.replace(/\n/g, "\n• ");
}

const removePrefix = (textarea) => {
    textarea.value = textarea.value.replace(/• /g, "");
}

const textareas = document.querySelectorAll('.tab-content');

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

/*function saveMealPlans() {
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
}
*/
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
    // Obtenha o botão "Salvar Cardapio" por seu ID ou classe
    $('#save-button').click(function() {
        // Verifique se uma data foi selecionada
        if ($("#datepicker").datepicker("getDate") === null) {
            // Se não, mostre um alerta e retorne para evitar o salvamento
            alert("Ops.. Você não selecionou uma data, a data atual sempre é demorada apenas para fins de visualização");
            return false;
        } else {
            // Se uma data foi selecionada, continue com o salvamento como de costume
            // Sua lógica de salvamento vai aqui

            // Exemplo de como você pode obter o texto de uma textarea
            var text = $('#your-textarea-id').val();
            console.log(text);
        }
    });
});
