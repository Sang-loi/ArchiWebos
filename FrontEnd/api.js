// Étape 1.1 : Récupération des travaux depuis le back-end
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');

    // Supprimer les travaux existants
    gallery.innerHTML = '';

    // Ajouter les travaux récupérés
    data.forEach(travail => {
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const figcaption = document.createElement('figcaption');

      image.src = travail.imageUrl;
      image.alt = travail.titre;
      figcaption.textContent = travail.title;

      figure.appendChild(image);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des travaux:', error);
  });

// Etape 1.2

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(table => {
    const filter = document.querySelector('.filter ul');
    table.forEach(button => {
        const li = document.createElement('li')
        li.textContent = button.name ;
        filter.appendChild(li);
        }
    )

    filter.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          const allFilters = filter.querySelectorAll('.filter ul li');
          allFilters.forEach(filterItem => filterItem.classList.remove('active'));

          event.target.classList.add('active');


          const selectedCategory = event.target.textContent;
          filterWorksByCategory(selectedCategory);
        }
      });
      
  }
  )

// Fonction pour filtrer les travaux par catégorie
function filterWorksByCategory(category) {
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');

    // Supprimer les travaux existants
    gallery.innerHTML = '';

    // Ajouter les travaux de la catégorie sélectionnée
    data.forEach(travail => {
      if (category === 'Tous' || travail.category.name === category) {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        image.src = travail.imageUrl;
        image.alt = travail.titre;
        figcaption.textContent = travail.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      }
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des travaux:', error);
  });
}


//Etape 2.2

// Vérification de la présence du token dans le localstorage
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('nav ul li a');
  
  if (token) {
    // Si le token est présent, changer le texte du bouton en "Logout"
    loginButton.textContent = 'logout';
    // Ajouter un événement au bouton "Logout" pour gérer la déconnexion
    loginButton.addEventListener('click', handleLogout);

    // Créer et ajouter l'élément <div> avec la classe "login" au <header> (uniquement si le token est présent)
    const header = document.querySelector('body');
    const loginDiv = document.createElement('div');
    loginDiv.className = 'login';

    // Créer l'élément <i> pour le mode édition
    const editIcon = document.createElement('i');
    editIcon.className = 'fa-regular fa-pen-to-square';
    const editModeText = document.createTextNode(' Mode édition ');
    const editModeContainer = document.createElement('div');
    editModeContainer.appendChild(editIcon);
    editModeContainer.appendChild(editModeText);
    editModeContainer.className = 'edit-mode';

    // Créer l'élément <div> pour la publication des changements avec la classe "publish"
    const publishContainer = document.createElement('a');

    // Ajout lien modal
    const modal = "#modal1";
    publishContainer.setAttribute("href", modal);
    publishContainer.textContent = 'publier les changements';
    publishContainer.className = 'publish js-modal';

    // Ajouter les éléments <div> dans le <header> (sous la classe "login")
    loginDiv.appendChild(editModeContainer);
    loginDiv.appendChild(publishContainer);
    header.insertBefore(loginDiv, header.firstChild);
  } else {
    // Si le token n'est pas présent, le bouton reste "login"
    loginButton.textContent = 'login';
    // Ajouter un événement au bouton "Login" pour gérer la connexion
    loginButton.addEventListener('click', handleLogin);
  }
});

// Fonction pour gérer la déconnexion (supprimer le token et rediriger vers login.html)
function handleLogout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// Fonction pour gérer la connexion (simplement rediriger vers login.html)
function handleLogin() {
  window.location.href = 'login.html';
}

//3.1
// Déclaration de la variable "modal" pour stocker la référence de la modal actuellement ouverte
let modal = null;

// Fonction pour ouvrir la modal
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = null;
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
  modal = target;

  // Ajout des événements pour gérer la fermeture de la modal
  modal.addEventListener('click', closeModal);
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

// Fonction pour fermer la modal
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');

  // Suppression des événements ajoutés lors de l'ouverture de la modal
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
  modal = null; // Réinitialisation de la variable "modal" à null
};

// Fonction pour arrêter la propagation des événements (notamment pour éviter la fermeture de la modal lorsque son contenu est cliqué)
const stopPropagation = function (e) {
  e.stopPropagation();
};

// Ajout des écouteurs d'événements sur tous les éléments avec la classe "js-modal"
document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal);
});
