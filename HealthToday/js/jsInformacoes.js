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

        if (user.feedbacks) {
            for (let feedback of user.feedbacks) {
                addFeedbackToPage(feedback);
            }
        }
    } else {
        window.location.href = 'login.html';
    }
};*/
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

        // Mostrar o feedback atual do usuário
        if (user.feedback) {
            // Limpeza da lista de feedbacks na página
            document.getElementById('feedback-list').innerHTML = '';
            addFeedbackToPage(user.feedback);
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

/*
document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Por favor, faça login para deixar um feedback');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === currentUser);
    
    let feedbackContent = document.getElementById('feedback-content').value;
    let feedbackStars = document.querySelector('.rating').getAttribute('data-rating'); 

    let feedback = {
        content: feedbackContent,
        stars: feedbackStars,
        date: new Date()
    };

    if(!user.feedbacks) {
        user.feedbacks = [];
    }
    user.feedbacks.push(feedback);
    

    localStorage.setItem('users', JSON.stringify(users));

    // Adicionando feedback à página
    addFeedbackToPage(feedback);

    alert('Feedback enviado com sucesso!');
});
*/

document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Por favor, faça login para deixar um feedback');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === currentUser);
    
    let feedbackContent = document.getElementById('feedback-content').value;
    let feedbackStars = document.querySelector('.rating').getAttribute('data-rating'); 

    let feedback = {
        content: feedbackContent,
        stars: feedbackStars,
        date: new Date()
    };

    user.feedback = feedback;

    localStorage.setItem('users', JSON.stringify(users));

    // Limpeza da lista de feedbacks na página
    document.getElementById('feedback-list').innerHTML = '';

    // Adicionando feedback à página
    addFeedbackToPage(feedback);

    alert('Feedback enviado com sucesso!');
});



function getStarIcons(numStars) {
    let starHTML = '';
    for (let i = 0; i < numStars; i++) {
        starHTML += '<span class="star selected">&#9733;</span>';
    }
    for (let i = numStars; i < 5; i++) {
        starHTML += '<span class="star">&#9733;</span>';
    }
    return starHTML;
}



/*
function addFeedbackToPage(feedback) {
    const feedbackList = document.getElementById('feedback-list');
    
    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('feedback-item');
    
    const feedbackText = document.createElement('p');
    feedbackText.textContent = feedback.content;
    
    const feedbackStars = document.createElement('div');
    feedbackStars.innerHTML = getStarIcons(feedback.stars);
    feedbackStars.classList.add('rating'); // Adicione esta linha
    
    feedbackContainer.appendChild(feedbackText);
    feedbackContainer.appendChild(feedbackStars);
    
    feedbackList.appendChild(feedbackContainer);
}*/


function addFeedbackToPage(feedback) {
    const feedbackList = document.getElementById('feedback-list');
    
    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('feedback-item');
    
    // Adicionando a imagem do usuário e o nome
    const userImage = document.createElement('img');
    userImage.src = document.querySelector('.user-icon').src;
    userImage.style.width = '50px';
    userImage.style.height = '50px';
    userImage.style.borderRadius = '50%';
    userImage.style.float = 'left';
    userImage.style.marginRight = '10px';

    const userName = document.createElement('p');
    let name = document.getElementById('welcome-message').textContent.replace('Olá, ', '').replace('!', '');
    name = name.charAt(0).toUpperCase() + name.slice(1);  // Aqui fazemos a primeira letra maiúscula
    userName.textContent = name;
    userName.style.fontWeight = 'bold';
    userName.style.marginLeft = '60px';

    feedbackContainer.appendChild(userImage);
    feedbackContainer.appendChild(userName);
    
    // Adicionando o descritivo
    const feedbackText = document.createElement('p');
    feedbackText.textContent = feedback.content;
    feedbackText.classList.add('feedback-descritivo');
    feedbackContainer.appendChild(feedbackText);

    // Adicionando as estrelas
    const feedbackStars = document.createElement('div');
    feedbackStars.innerHTML = getStarIcons(feedback.stars);
    feedbackStars.classList.add('rating');
    
    feedbackContainer.appendChild(feedbackStars);
    
    feedbackList.appendChild(feedbackContainer);
}

var stars = document.querySelectorAll(".star");
var form = document.querySelector("#feedback-form");

    stars.forEach(function(star, index) {
        star.addEventListener("click", function() {
            for(i = 0; i <= index; i++) {
                stars[i].classList.add('selected');
            }
            for(; i < stars.length; i++) {
                stars[i].classList.remove('selected');
            }
            document.querySelector('.rating').setAttribute('data-rating', index + 1);
        });
    });
